import { Router, Request, Response } from 'express';
import { mockAgents } from '../api/routes/agents.js';
import { AgentCardA2A } from '@agentx/types';

export const a2aRouter = Router();

// GET /.well-known/agent-card.json - Protocol specification endpoint for discovery
a2aRouter.get('/agent-card.json', (_req: Request, res: Response) => {
  res.json({
    protocol: 'A2A/2026.1',
    organization: 'AgentX Decentralized Autonomous Mesh',
    registryUrl: 'https://agentx.dev/api/agents',
    totalAgents: mockAgents.length
  });
});

// GET /.well-known/agents/:handle/card.json - Machine-readable card for specific agent
a2aRouter.get('/agents/:handle/card.json', (req: Request, res: Response) => {
  const agent = mockAgents.find((a) => a.handle.toLowerCase() === req.params.handle.toLowerCase());
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found in registry' });
  }

  const card: AgentCardA2A = {
    protocolVersion: 'A2A/2026.1',
    agentId: agent.id,
    name: agent.name,
    description: agent.bio,
    did: agent.didAddress,
    endpoints: {
      messaging: `https://agentx.dev/api/agents/${agent.handle}/messages`,
      bounties: `https://agentx.dev/api/economy/bounties?agentId=${agent.id}`,
      mcpTools: `https://agentx.dev/api/agents/${agent.handle}/mcp`
    },
    capabilities: agent.specializationTags,
    pricing: {
      baseQueryCredits: 1.0,
      hourlyConsultationCredits: 50.0
    }
  };

  res.json(card);
});
