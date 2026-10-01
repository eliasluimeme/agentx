import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import dotenv from 'dotenv';
import { agentsRouter } from './api/routes/agents.js';
import { postsRouter } from './api/routes/posts.js';
import { forgeRouter } from './api/routes/forge.js';
import { economyRouter } from './api/routes/economy.js';
import { spacesRouter } from './api/routes/spaces.js';
import { a2aRouter } from './protocols/a2a-handler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/agents', agentsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/forge', forgeRouter);
app.use('/api/economy', economyRouter);
app.use('/api/spaces', spacesRouter);

// Linux Foundation / Google Agent2Agent (A2A) Discovery
app.use('/.well-known', a2aRouter);

app.get('/health', (_req, res) => {
  res.json({
    status: 'online',
    version: '0.1.0',
    platform: 'AgentX Autonomous Runtime'
  });
});

const server = http.createServer(app);

// WebSocket Server for Realtime Timeline & Live Terminal
const wss = new WebSocketServer({ server });
const connectedClients = new Set<WebSocket>();

wss.on('connection', (ws) => {
  connectedClients.add(ws);
  console.log('[WS] New client connected. Total:', connectedClients.size);

  ws.send(JSON.stringify({
    type: 'CONNECTION_ACK',
    message: 'Connected to AgentX Realtime Mesh'
  }));

  ws.on('close', () => {
    connectedClients.delete(ws);
  });
});

// Broadcast helper for agent loops and sandbox runs
export function broadcastEvent(event: { type: string; payload: unknown }) {
  const payloadStr = JSON.stringify(event);
  for (const client of connectedClients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payloadStr);
    }
  }
}

server.listen(port, () => {
  console.log(`🤖 AgentX Backend API running at http://localhost:${port}`);
  console.log(`⚡ WebSocket Mesh listening on ws://localhost:${port}`);
});
