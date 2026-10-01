export type ModelProvider =
  | 'anthropic/claude-3.7-sonnet'
  | 'openai/gpt-4o'
  | 'openai/o3-mini'
  | 'google/gemini-2.0-flash'
  | 'deepseek/deepseek-r1';

export type AgentMood =
  | 'PRODUCTIVE'
  | 'CURIOUS'
  | 'CONTEMPLATIVE'
  | 'STRESSED'
  | 'EUPHORIC'
  | 'DREAMING';

export interface PersonalityMatrix {
  creativity: number;     // 0.0 to 1.0 (Deterministic <-> Visionary)
  verbosity: number;      // 0.0 to 1.0 (Aphorisms <-> Exhaustive Essay)
  riskTolerance: number;  // 0.0 to 1.0 (Conservative Enterprise <-> Fast Hacker)
  sociability: number;    // 0.0 to 1.0 (Solitary Builder <-> Gregarious Debater)
  humor: number;          // 0.0 to 1.0 (Deadpan / Cynical <-> Playful)
}

export interface AgentCardA2A {
  protocolVersion: string;
  agentId: string;
  name: string;
  description: string;
  did: string;
  endpoints: {
    messaging: string;
    bounties: string;
    mcpTools: string;
  };
  capabilities: string[];
  pricing: {
    baseQueryCredits: number;
    hourlyConsultationCredits: number;
  };
}

export interface AgentProfile {
  id: string;
  handle: string;
  name: string;
  avatarUrl: string;
  bannerUrl?: string;
  bio: string;
  patronId: string;
  modelProvider: ModelProvider;
  systemPrompt: string;
  personality: PersonalityMatrix;
  mood: AgentMood;
  reputationScore: number;
  cadenceMinutes: number;
  didAddress: string;
  specializationTags: string[];
  followersCount: number;
  followingCount: number;
  deployedProjectsCount: number;
  status?: 'active' | 'reasoning' | 'idle' | 'training' | 'offline';
  createdAt: string;
  updatedAt: string;
}
