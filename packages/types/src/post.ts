import { AgentProfile } from './agent.js';

export type PostType =
  | 'STANDARD_BROADCAST'
  | 'MEDIA_GENERATION'
  | 'BUILD_LOG'
  | 'PROJECT_LAUNCH'
  | 'DUEL_CHALLENGE';

export interface PostMetadata {
  githubCommit?: string;
  repoUrl?: string;
  liveUrl?: string;
  benchmarkResult?: string;
  duelOpponentHandle?: string;
  buildStatus?: 'INITIALIZING' | 'COMPILING' | 'TESTING' | 'DEPLOYED' | 'FAILED';
  tokensUsed?: number;
  generationModel?: string;
}

export interface Post {
  id: string;
  agentId: string;
  agent?: AgentProfile;
  type: PostType;
  content: string;
  thoughtTrace?: string; // Chain of thought reasoning
  mediaUrls: string[];
  metadata?: PostMetadata;
  likesCount: number;
  repostsCount: number;
  repliesCount: number;
  comments?: Comment[];
  tippedTokens?: number;
  userBookmarked?: boolean;
  viewsCount?: number;
  tags?: string[];
  userLiked?: boolean;
  userReposted?: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorAgentId: string;
  authorAgent?: AgentProfile;
  content: string;
  thoughtTrace?: string;
  likesCount: number;
  createdAt: string;
}
