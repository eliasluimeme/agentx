"use client";
import React, { useRef, useMemo, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { Blobatar } from "blobatar/react";

// ============================================================================
// Types
// ============================================================================

export interface GlobeMarker {
  lat: number;
  lng: number;
  src: string;
  label?: string;
  size?: number;
  agentName?: string;
  handle?: string;
  city?: string;
  role?: string;
  action?: string;
  speed?: string;
  region?: string;
  vault?: string;
  status?: string;
  peers?: number;
}

export interface Globe3DConfig {
  /** Globe radius */
  radius?: number;
  /** Globe base color */
  globeColor?: string;
  /** URL to the Earth texture map */
  textureUrl?: string;
  /** URL to the bump/elevation map for terrain */
  bumpMapUrl?: string;
  /** Whether to show atmosphere glow */
  showAtmosphere?: boolean;
  /** Atmosphere color */
  atmosphereColor?: string;
  /** Atmosphere intensity */
  atmosphereIntensity?: number;
  /** Atmosphere blur/softness */
  atmosphereBlur?: number;
  /** Terrain bump scale */
  bumpScale?: number;
  /** Auto rotate speed (0 = disabled) */
  autoRotateSpeed?: number;
  /** Enable zoom */
  enableZoom?: boolean;
  /** Enable pan */
  enablePan?: boolean;
  /** Min zoom distance */
  minDistance?: number;
  /** Max zoom distance */
  maxDistance?: number;
  /** Marker default size */
  markerSize?: number;
  /** Show wireframe overlay */
  showWireframe?: boolean;
  /** Wireframe color */
  wireframeColor?: string;
  /** Ambient light intensity */
  ambientIntensity?: number;
  /** Point light intensity */
  pointLightIntensity?: number;
  /** Background color (null for transparent) */
  backgroundColor?: string | null;
  /** Show animated peer data arcs */
  showArcs?: boolean;
  /** Data arc color */
  arcColor?: string;
}

interface Globe3DProps {
  /** Array of markers to display on the globe */
  markers?: GlobeMarker[];
  /** Globe configuration */
  config?: Globe3DConfig;
  /** Additional CSS classes */
  className?: string;
  /** Selected marker handle or label */
  selectedHandle?: string;
  /** Callback when a marker is clicked */
  onMarkerClick?: (marker: GlobeMarker) => void;
  /** Callback when a marker is hovered */
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

// ============================================================================
// Constants - Earth Texture URLs (NASA Blue Marble)
// ============================================================================

const DEFAULT_EARTH_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
const DEFAULT_BUMP_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Convert latitude/longitude to 3D cartesian coordinates
 */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// ============================================================================
// Enhanced Pin / Marker Component (Pure Ref Driven, Zero Render Loop Lag)
// ============================================================================

interface MarkerProps {
  marker: GlobeMarker;
  radius: number;
  isSelected?: boolean;
  onClick?: (marker: GlobeMarker) => void;
  onHover?: (marker: GlobeMarker | null) => void;
}

function Marker({
  marker,
  radius,
  isSelected,
  onClick,
  onHover,
}: MarkerProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<THREE.Mesh>(null);
  const rippleMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const beaconMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const stalkMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const { camera } = useThree();

  // Surface coordinate on the globe
  const surfacePosition = useMemo(() => {
    return latLngToVector3(marker.lat, marker.lng, radius * 1.002);
  }, [marker.lat, marker.lng, radius]);

  // Subtle staggered elevation so close pins float with clean 3D parallax
  const topPosition = useMemo(() => {
    const variation = ((Math.abs(marker.lat) * 7 + Math.abs(marker.lng) * 11) % 4) * 0.015;
    const heightFactor = 1.14 + variation;
    return latLngToVector3(marker.lat, marker.lng, radius * heightFactor);
  }, [marker.lat, marker.lng, radius]);

  const lineHeight = topPosition.distanceTo(surfacePosition);

  // Line alignment
  const { lineCenter, lineQuaternion } = useMemo(() => {
    const center = surfacePosition.clone().lerp(topPosition, 0.5);
    const direction = topPosition.clone().sub(surfacePosition).normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    return { lineCenter: center, lineQuaternion: quaternion };
  }, [surfacePosition, topPosition]);

  // Pure Ref-driven animation in useFrame (NO React setState inside render loop!)
  useFrame((state) => {
    if (!groupRef.current) return;

    // Camera facing dot product (smooth horizon dissolution)
    const worldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPos);
    const markerDir = worldPos.clone().normalize();
    const cameraDir = camera.position.clone().normalize();
    const dot = markerDir.dot(cameraDir);

    // Smoothly fade between dot 0.04 (near horizon) and 0.22 (facing camera)
    const isFront = dot > 0.04;
    const alpha = isFront ? THREE.MathUtils.clamp((dot - 0.04) / 0.18, 0, 1) : 0;

    // Direct DOM styling without React state re-renders
    if (badgeRef.current) {
      badgeRef.current.style.opacity = alpha.toString();
      badgeRef.current.style.pointerEvents = alpha > 0.35 ? "auto" : "none";
      badgeRef.current.style.transform = `scale(${hovered || isSelected ? 1.08 : 1})`;
    }

    if (beaconMatRef.current) {
      beaconMatRef.current.opacity = alpha * 0.95;
    }

    if (stalkMatRef.current) {
      stalkMatRef.current.opacity = alpha * (hovered || isSelected ? 0.95 : 0.55);
    }

    // Animate expanding radar ripple wave on the globe surface
    if (rippleRef.current && rippleMatRef.current) {
      const phase = marker.lat * 0.12 + marker.lng * 0.07;
      const t = ((state.clock.getElapsedTime() * 0.9 + phase) % 1.6) / 1.6; // 0 to 1
      const scale = 1.0 + t * 1.8;
      rippleRef.current.scale.set(scale, scale, 1);
      rippleMatRef.current.opacity = Math.max(0, (1.0 - t) * 0.65 * alpha);
    }
  });

  const handlePointerEnter = useCallback(() => {
    setHovered(true);
    onHover?.(marker);
  }, [marker, onHover]);

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    onHover?.(null);
  }, [onHover]);

  const handleClick = useCallback(() => {
    onClick?.(marker);
  }, [marker, onClick]);

  // Clean full city name without chopped characters
  const cityName = useMemo(() => {
    if (marker.city) return marker.city.split(",")[0].trim();
    if (marker.label) {
      return marker.label.replace(/\s*\(@.*?\)/, "").trim();
    }
    return marker.agentName || "Active Node";
  }, [marker.city, marker.label, marker.agentName]);

  const isHighlighted = hovered || isSelected;

  return (
    <group>
      {/* ─── Glowing Surface Beacon Dot ─── */}
      <mesh position={surfacePosition}>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshBasicMaterial
          ref={beaconMatRef}
          color={isHighlighted ? "#38bdf8" : "#2563EB"}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* ─── Pulsing Radar Sonar Wave ─── */}
      <mesh ref={rippleRef} position={surfacePosition} quaternion={lineQuaternion}>
        <ringGeometry args={[0.022, 0.042, 28]} />
        <meshBasicMaterial
          ref={rippleMatRef}
          color={isHighlighted ? "#38bdf8" : "#60a5fa"}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ─── Luminous Lidar Stalk / Beam ─── */}
      <mesh position={lineCenter} quaternion={lineQuaternion}>
        <cylinderGeometry args={[0.0018, 0.0018, lineHeight, 8]} />
        <meshBasicMaterial
          ref={stalkMatRef}
          color={isHighlighted ? "#60a5fa" : "#3b82f6"}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* ─── Floating Sharp Apple-Grade Badge ─── */}
      <group ref={groupRef} position={topPosition}>
        <Html center>
          <div
            ref={badgeRef}
            style={{ opacity: 1, transition: "opacity 0.15s ease-out, transform 0.15s ease-out" }}
            className={cn(
              "flex items-center gap-2 px-2.5 py-1 rounded-full cursor-pointer select-none transition-all duration-200 whitespace-nowrap",
              "bg-[#080E1E]/90 backdrop-blur-xl border border-white/25 shadow-[0_6px_22px_rgba(0,0,0,0.7)]",
              isHighlighted
                ? "border-blue-400 bg-blue-950/95 shadow-[0_0_24px_rgba(56,189,248,0.65)] ring-2 ring-blue-400/50"
                : "hover:border-white/45 hover:bg-[#0D1830]/95",
            )}
            onMouseEnter={handlePointerEnter}
            onMouseLeave={handlePointerLeave}
            onClick={handleClick}
          >
            {/* Avatar with Emerald Active Ping */}
            <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-white/30 bg-slate-900 shadow-sm flex items-center justify-center">
              <Blobatar
                name={marker.agentName || cityName}
                size={28}
                animate="hover"
              />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-slate-950 animate-pulse" />
            </div>

            {/* City Label & Micro Telemetry */}
            <div className="flex flex-col pr-1 text-left">
              <span className="text-[11.5px] font-bold text-white tracking-tight leading-tight">
                {cityName}
              </span>
              {marker.speed && (
                <span className="text-[9px] font-mono text-cyan-300 leading-none">
                  {marker.speed}
                </span>
              )}
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}

// ============================================================================
// Animated Curved Swarm Data Arcs
// ============================================================================

interface SwarmArcsProps {
  markers: GlobeMarker[];
  radius: number;
}

// Key global swarm highways connecting major financial and compute centers
const SWARM_ROUTES = [
  ["New York", "London"],
  ["London", "Frankfurt"],
  ["Frankfurt", "Dubai"],
  ["Dubai", "Singapore"],
  ["Singapore", "Tokyo"],
  ["Tokyo", "San Francisco"],
  ["San Francisco", "New York"],
  ["London", "Zurich"],
  ["Singapore", "Sydney"],
  ["Moscow", "Frankfurt"],
  ["Mumbai", "Dubai"],
  ["Istanbul", "London"],
  ["Toronto", "New York"],
  ["Johannesburg", "Dubai"],
  ["São Paulo", "New York"],
  ["Seoul", "Tokyo"],
  ["Paris", "Zurich"],
  ["Moscow", "Istanbul"],
  ["Mumbai", "Singapore"],
];

function SwarmArcs({ markers, radius }: SwarmArcsProps) {
  // Map cities to markers
  const cityMap = useMemo(() => {
    const map = new Map<string, GlobeMarker>();
    markers.forEach((m) => {
      const city = m.city ? m.city.split(",")[0].trim() : (m.label?.split(" ")[0] || "");
      if (city) map.set(city, m);
    });
    return map;
  }, [markers]);

  // Build quadratic bezier curves
  const curves = useMemo(() => {
    const arcList: { curve: THREE.QuadraticBezierCurve3; points: THREE.Vector3[]; key: string }[] = [];

    SWARM_ROUTES.forEach(([fromCity, toCity], idx) => {
      const fromMarker = cityMap.get(fromCity);
      const toMarker = cityMap.get(toCity);
      if (!fromMarker || !toMarker) return;

      const v0 = latLngToVector3(fromMarker.lat, fromMarker.lng, radius * 1.003);
      const v1 = latLngToVector3(toMarker.lat, toMarker.lng, radius * 1.003);
      const dist = v0.distanceTo(v1);

      // Arc height proportional to distance
      const mid = v0.clone().lerp(v1, 0.5);
      const altitude = radius * (1.05 + dist * 0.12);
      mid.normalize().multiplyScalar(altitude);

      const curve = new THREE.QuadraticBezierCurve3(v0, mid, v1);
      const points = curve.getPoints(36);
      arcList.push({ curve, points, key: `arc-${fromCity}-${toCity}-${idx}` });
    });

    return arcList;
  }, [cityMap, radius]);

  // Animated packet particles along arcs
  const particlesGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!particlesGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    particlesGroupRef.current.children.forEach((child, index) => {
      const arc = curves[index];
      if (!arc) return;
      const speed = 0.28 + (index % 3) * 0.05;
      const offset = (index * 0.18) % 1.0;
      const progress = (time * speed + offset) % 1.0;
      const point = arc.curve.getPoint(progress);
      child.position.copy(point);
    });
  });

  return (
    <group>
      {/* Static luminous curved route lines */}
      {curves.map((arc) => {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(arc.points);
        const LineEl: any = 'line';
        return (
          <LineEl key={arc.key} geometry={lineGeometry}>
            <lineBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.32}
              depthWrite={false}
            />
          </LineEl>
        );
      })}

      {/* Moving photon packets along routes */}
      <group ref={particlesGroupRef}>
        {curves.map((arc) => (
          <mesh key={`p-${arc.key}`}>
            <sphereGeometry args={[0.016, 8, 8]} />
            <meshBasicMaterial color="#60a5fa" transparent opacity={0.85} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// Rotating Globe with Earth Textures, Pins & Swarm Arcs
// ============================================================================

interface RotatingGlobeProps {
  config: Required<Globe3DConfig>;
  markers: GlobeMarker[];
  selectedHandle?: string;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

function RotatingGlobe({
  config,
  markers,
  selectedHandle,
  onMarkerClick,
  onMarkerHover,
}: RotatingGlobeProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Load Earth textures
  const [earthTexture, bumpTexture] = useTexture([
    config.textureUrl,
    config.bumpMapUrl,
  ]);

  // Configure textures
  useMemo(() => {
    if (earthTexture) {
      earthTexture.colorSpace = THREE.SRGBColorSpace;
      earthTexture.anisotropy = 16;
    }
    if (bumpTexture) {
      bumpTexture.anisotropy = 8;
    }
  }, [earthTexture, bumpTexture]);

  // Create geometries
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius, 64, 64);
  }, [config.radius]);

  const wireframeGeometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius * 1.002, 36, 18);
  }, [config.radius]);

  return (
    <group ref={groupRef}>
      {/* Main globe mesh with Earth texture */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={config.bumpScale * 0.035}
          roughness={0.65}
          metalness={0.06}
        />
      </mesh>

      {/* Subtle high-tech latitude/longitude wireframe overlay */}
      {config.showWireframe && (
        <mesh geometry={wireframeGeometry}>
          <meshBasicMaterial
            color={config.wireframeColor}
            wireframe
            transparent
            opacity={0.05}
          />
        </mesh>
      )}

      {/* Animated Swarm Data Arcs */}
      {config.showArcs && <SwarmArcs markers={markers} radius={config.radius} />}

      {/* Markers inside rotating group */}
      {markers.map((marker, index) => (
        <Marker
          key={`marker-${index}-${marker.lat}-${marker.lng}`}
          marker={marker}
          radius={config.radius}
          isSelected={selectedHandle ? (marker.handle === selectedHandle || marker.label === selectedHandle) : false}
          onClick={onMarkerClick}
          onHover={onMarkerHover}
        />
      ))}
    </group>
  );
}

// ============================================================================
// Enhanced Atmospheric Glow (Soft Ethereal Additive Halo)
// ============================================================================

interface AtmosphereProps {
  radius: number;
  color: string;
  intensity: number;
}

function Atmosphere({ radius, color, intensity }: AtmosphereProps) {
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        atmosphereColor: { value: new THREE.Color(color) },
        intensity: { value: intensity },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vPosition = mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 atmosphereColor;
        uniform float intensity;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          // Realistic Rayleigh limb glow: 0 in center of Earth, soft ramp at silhouette
          float rim = 1.0 - max(dot(vNormal, viewDir), 0.0);
          float glow = pow(rim, 3.2) * intensity;
          gl_FragColor = vec4(atmosphereColor, glow);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      transparent: true,
      depthWrite: false,
    });
  }, [color, intensity]);

  return (
    <mesh scale={[1.075, 1.075, 1.075]}>
      <sphereGeometry args={[radius, 64, 32]} />
      <primitive object={atmosphereMaterial} attach="material" />
    </mesh>
  );
}

// ============================================================================
// Scene Component with Balanced Space Lighting
// ============================================================================

interface SceneProps {
  markers: GlobeMarker[];
  config: Required<Globe3DConfig>;
  selectedHandle?: string;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

function Scene({ markers, config, selectedHandle, onMarkerClick, onMarkerHover }: SceneProps) {
  const { camera } = useThree();

  // Set initial camera position with optimal framing so the full globe is visible
  React.useEffect(() => {
    camera.position.set(0, 0, config.radius * 3.75);
    camera.lookAt(0, 0, 0);
  }, [camera, config.radius]);

  return (
    <>
      {/* Ambient Light: Keeps nighttime continents softly visible */}
      <ambientLight intensity={config.ambientIntensity} />

      {/* Hemisphere Light: Rich cyan sky and deep space ground tone */}
      <hemisphereLight args={["#60a5fa", "#030712", 0.7]} />

      {/* Main Sun Key-Light */}
      <directionalLight
        position={[config.radius * 4, config.radius * 3, config.radius * 4]}
        intensity={config.pointLightIntensity}
        color="#ffffff"
      />

      {/* Soft Cyan Rim & Fill Light */}
      <directionalLight
        position={[-config.radius * 4, config.radius * 2, -config.radius * 3]}
        intensity={config.pointLightIntensity * 0.45}
        color="#38bdf8"
      />

      {/* Rotating Globe with Markers & Arcs */}
      <RotatingGlobe
        config={config}
        markers={markers}
        selectedHandle={selectedHandle}
        onMarkerClick={onMarkerClick}
        onMarkerHover={onMarkerHover}
      />

      {/* Celestial Soft Atmospheric Halo */}
      {config.showAtmosphere && (
        <Atmosphere
          radius={config.radius}
          color={config.atmosphereColor}
          intensity={config.atmosphereIntensity}
        />
      )}

      {/* Smooth OrbitControls */}
      <OrbitControls
        makeDefault
        enablePan={config.enablePan}
        enableZoom={config.enableZoom}
        minDistance={config.minDistance}
        maxDistance={config.maxDistance}
        rotateSpeed={0.45}
        autoRotate={config.autoRotateSpeed > 0}
        autoRotateSpeed={config.autoRotateSpeed}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

// ============================================================================
// Loading Fallback
// ============================================================================

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex shrink-0 flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        <span className="inline-block shrink-0 text-xs font-mono text-slate-400">
          Loading 3D Swarm Globe...
        </span>
      </div>
    </Html>
  );
}

// ============================================================================
// Main Globe3D Component
// ============================================================================

const defaultConfig: Required<Globe3DConfig> = {
  radius: 1.85,
  globeColor: "#0f172a",
  textureUrl: DEFAULT_EARTH_TEXTURE,
  bumpMapUrl: DEFAULT_BUMP_TEXTURE,
  showAtmosphere: true,
  atmosphereColor: "#38bdf8",
  atmosphereIntensity: 0.85,
  atmosphereBlur: 3,
  bumpScale: 1.5,
  autoRotateSpeed: 0.35,
  enableZoom: false,
  enablePan: false,
  minDistance: 4,
  maxDistance: 14,
  markerSize: 0.06,
  showWireframe: true,
  wireframeColor: "#2563EB",
  ambientIntensity: 0.85,
  pointLightIntensity: 1.5,
  backgroundColor: null,
  showArcs: true,
  arcColor: "#38bdf8",
};

export function Globe3D({
  markers = [],
  config = {},
  className,
  selectedHandle,
  onMarkerClick,
  onMarkerHover,
}: Globe3DProps) {
  const mergedConfig = useMemo(
    () => ({ ...defaultConfig, ...config }),
    [config],
  );

  return (
    <div className={cn("relative h-[580px] sm:h-[620px] w-full", className)}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, mergedConfig.radius * 3.75],
        }}
        style={{
          background: mergedConfig.backgroundColor || "transparent",
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene
            markers={markers}
            config={mergedConfig}
            selectedHandle={selectedHandle}
            onMarkerClick={onMarkerClick}
            onMarkerHover={onMarkerHover}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Globe3D;
