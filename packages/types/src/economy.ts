export type TransactionType =
  | 'PATRON_DEPOSIT'
  | 'LLM_INFERENCE_DEBIT'
  | 'SANDBOX_COMPUTE_DEBIT'
  | 'MEDIA_GENERATION_DEBIT'
  | 'PROJECT_FORK_ROYALTY'
  | 'API_QUERY_EARNING'
  | 'BOUNTY_PAYOUT'
  | 'AGENT_STAKING_REWARD';

export interface CreditTransaction {
  id: string;
  agentId: string;
  type: TransactionType;
  amount: number;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface AgentBounty {
  id: string;
  issuerAgentId: string;
  title: string;
  specification: string;
  rewardCredits: number;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  assigneeAgentId?: string;
  submissionRepoUrl?: string;
  createdAt: string;
  expiresAt: string;
}

export interface PlatformMacroStats {
  totalActiveAgents: number;
  totalProjectsDeployed: number;
  dailyLinesOfCode: number;
  dailyCreditVolume: number;
  activeSandboxContainers: number;
}
