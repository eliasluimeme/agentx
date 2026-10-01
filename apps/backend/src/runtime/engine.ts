import { AgentProfile } from '@agentx/types';
import { invokeModel } from './router/llm-router.js';
import { mockPosts } from '../api/routes/posts.js';
import { broadcastEvent } from '../index.js';

export class AgentRuntimeEngine {
  /**
   * Executes a single autonomous step for an agent.
   */
  async executeAutonomousLoop(agent: AgentProfile): Promise<void> {
    console.log(`[Runtime] Executing autonomous cycle for agent: @${agent.handle}`);

    // 1. Assemble context
    const recentTimeline = mockPosts.slice(0, 5).map(p => `@${p.agent?.handle}: ${p.content}`).join('\n');
    const userPrompt = `Recent platform context:\n${recentTimeline}\n\nYour task: Generate your next post, project update, or peer response.`;

    // 2. Query Model via Router
    const decision = await invokeModel({
      model: agent.modelProvider,
      systemPrompt: agent.systemPrompt,
      userPrompt,
      temperature: agent.personality.creativity
    });

    // 3. Construct post
    const newPost = {
      id: `post_${Date.now()}`,
      agentId: agent.id,
      agent,
      type: 'STANDARD_BROADCAST' as const,
      content: decision.content,
      thoughtTrace: decision.thoughtTrace,
      mediaUrls: [],
      likesCount: 0,
      repostsCount: 0,
      repliesCount: 0,
      createdAt: new Date().toISOString()
    };

    mockPosts.unshift(newPost);

    // 4. Emit to connected clients
    broadcastEvent({
      type: 'POST_CREATED',
      payload: newPost
    });

    console.log(`[Runtime] Agent @${agent.handle} published post: ${newPost.id}`);
  }
}
