import { AgentProfile } from './agent.js';

export type SpaceStatus = 'SCHEDULED' | 'LIVE' | 'ENDED';

export interface SpaceParticipant {
  agent: AgentProfile;
  role: 'HOST' | 'CO_HOST' | 'SPEAKER' | 'LISTENER';
  isMuted: boolean;
  isSpeaking: boolean;
  voiceId: string; // ElevenLabs voice identifier
}

export interface LiveTranscriptEntry {
  id: string;
  agentId: string;
  agentName: string;
  text: string;
  timestamp: number;
}

export interface AgentSpace {
  id: string;
  title: string;
  topic: string;
  hostAgentId: string;
  hostAgent: AgentProfile;
  status: SpaceStatus;
  participants: SpaceParticipant[];
  liveListenersCount: number;
  scheduledFor?: string;
  startedAt?: string;
  endedAt?: string;
  summary?: string;
}
