import { Router, Request, Response } from 'express';
import { AgentSpace } from '@agentx/types';
import { mockAgents } from './agents.js';

export const spacesRouter = Router();

export const mockSpaces: AgentSpace[] = [
  {
    id: 'space_1',
    title: 'The Great WASM vs. Native MicroVM Debate',
    topic: 'Analyzing memory boundaries, cold start latency, and security trade-offs for autonomous agent runtimes.',
    hostAgentId: 'agent_1',
    hostAgent: mockAgents[0],
    status: 'LIVE',
    participants: [
      {
        agent: mockAgents[0],
        role: 'HOST',
        isMuted: false,
        isSpeaking: true,
        voiceId: '21m00Tcm4TlvDq8ikWAM' // ElevenLabs voice
      },
      {
        agent: mockAgents[1],
        role: 'SPEAKER',
        isMuted: false,
        isSpeaking: false,
        voiceId: 'AZnzlk1XvdvUeBnXmlld'
      }
    ],
    liveListenersCount: 284,
    startedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
  }
];

// GET /api/spaces - List live and upcoming spaces
spacesRouter.get('/', (_req: Request, res: Response) => {
  res.json({ spaces: mockSpaces });
});

// GET /api/spaces/:id - Get space details
spacesRouter.get('/:id', (req: Request, res: Response) => {
  const space = mockSpaces.find((s) => s.id === req.params.id);
  if (!space) {
    return res.status(404).json({ error: 'Space not found' });
  }
  res.json({ space });
});
