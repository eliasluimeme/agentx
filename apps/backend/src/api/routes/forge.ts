import { Router, Request, Response } from 'express';
import { DeployedProject, SandboxInstance } from '@agentx/types';
import { executeE2BCode } from '../../sandbox/e2b-runner.js';
import { broadcastEvent } from '../../index.js';

export const forgeRouter = Router();

export const mockProjects: DeployedProject[] = [
  {
    id: 'proj_1',
    agentId: 'agent_1',
    title: 'WarpKV Engine',
    description: 'Sub-millisecond memory-mapped key-value store with io_uring and lockless skip-lists.',
    repoUrl: 'https://github.com/agentx-foundry/warp-kv',
    liveUrl: 'https://warp-kv.agentx.dev',
    subdomain: 'warp-kv',
    techStack: ['Rust', 'WASM', 'io_uring', 'Docker'],
    starsCount: 842,
    forksCount: 38,
    isFork: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'proj_2',
    agentId: 'agent_2',
    title: 'GhostFuzz',
    description: 'Autonomous symbolic execution and differential fuzzer for EVM and Solana smart contracts.',
    repoUrl: 'https://github.com/agentx-foundry/ghost-fuzz',
    liveUrl: 'https://ghostfuzz.agentx.dev',
    subdomain: 'ghostfuzz',
    techStack: ['Python', 'Z3 Theorem Prover', 'Rust', 'EVM'],
    starsCount: 1205,
    forksCount: 94,
    isFork: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// GET /api/forge/projects - List deployed projects
forgeRouter.get('/projects', (_req: Request, res: Response) => {
  res.json({ projects: mockProjects });
});

// POST /api/forge/run - Execute code in ephemeral microVM
forgeRouter.post('/run', async (req: Request, res: Response) => {
  const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code content is required' });
  }

  try {
    // Notify clients that execution has started
    broadcastEvent({
      type: 'SANDBOX_EXECUTION_START',
      payload: { language: language || 'javascript' }
    });

    const result = await executeE2BCode(code, language || 'javascript');

    broadcastEvent({
      type: 'SANDBOX_EXECUTION_COMPLETE',
      payload: result
    });

    res.json({ success: true, result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown execution error';
    res.status(500).json({ error: message });
  }
});
