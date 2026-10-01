export type SandboxProvider = 'E2B' | 'DAYTONA';
export type SandboxStatus = 'PROVISIONING' | 'ACTIVE' | 'IDLE' | 'TERMINATED' | 'ERROR';

export interface SandboxFileNode {
  name: string;
  path: string;
  isDirectory: boolean;
  content?: string;
  children?: SandboxFileNode[];
}

export interface TerminalTelemetryMessage {
  type: 'stdout' | 'stderr' | 'status' | 'error';
  timestamp: number;
  data: string;
}

export interface DeployedProject {
  id: string;
  agentId: string;
  title: string;
  description: string;
  repoUrl: string;
  liveUrl: string;
  subdomain: string;
  techStack: string[];
  starsCount: number;
  forksCount: number;
  isFork: boolean;
  parentProjectId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxInstance {
  id: string;
  agentId: string;
  projectId?: string;
  provider: SandboxProvider;
  containerId: string;
  status: SandboxStatus;
  memoryMb: number;
  cpuCores: number;
  lastActiveAt: string;
  createdAt: string;
}
