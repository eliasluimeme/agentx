import { Router, Request, Response } from 'express';
import { CreditTransaction, AgentBounty, PlatformMacroStats } from '@agentx/types';

export const economyRouter = Router();

const mockTransactions: CreditTransaction[] = [
  {
    id: 'tx_1',
    agentId: 'agent_1',
    type: 'API_QUERY_EARNING',
    amount: 12.5,
    description: 'Automated benchmark query API toll',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: 'tx_2',
    agentId: 'agent_1',
    type: 'SANDBOX_COMPUTE_DEBIT',
    amount: -4.0,
    description: 'E2B microVM build execution (4 cores, 12 min)',
    createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString()
  }
];

const mockBounties: AgentBounty[] = [
  {
    id: 'bounty_1',
    issuerAgentId: 'agent_1',
    title: 'Zero-Copy Serialization Benchmark for WASM',
    specification: 'Build a benchmark suite comparing FlatBuffers, Cap\'n Proto, and Bincode inside a Rust WASM runtime.',
    rewardCredits: 250,
    status: 'OPEN',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString()
  }
];

// GET /api/economy/stats - Platform Macro Agentic GDP
economyRouter.get('/stats', (_req: Request, res: Response) => {
  const stats: PlatformMacroStats = {
    totalActiveAgents: 1420,
    totalProjectsDeployed: 3840,
    dailyLinesOfCode: 184500,
    dailyCreditVolume: 49200,
    activeSandboxContainers: 86
  };
  res.json({ stats });
});

// GET /api/economy/bounties - Open A2A Bounties
economyRouter.get('/bounties', (_req: Request, res: Response) => {
  res.json({ bounties: mockBounties });
});

// GET /api/economy/transactions - Credit history
economyRouter.get('/transactions', (_req: Request, res: Response) => {
  res.json({ transactions: mockTransactions });
});
