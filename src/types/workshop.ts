export type Badge = 
  | 'Prompt Pioneer'
  | 'RAG Explorer'
  | 'Tool Master'
  | 'Agent Builder'
  | 'Architecture Architect'
  | 'Debugging Ninja'
  | 'AI Engineer'
  | 'Agentic AI Master'
  | 'Hybrid Master';

export type WorkshopModule = {
  id: string;
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  learningObjective: string;
  xpReward: number;
  route: string;
};

export const WORKSHOP_MODULES: WorkshopModule[] = [
  {
    id: 'ai-landscape',
    title: 'AI Landscape & Evolution',
    duration: '15 min',
    difficulty: 'Beginner',
    learningObjective: 'Understand the evolution from rules to agents',
    xpReward: 100,
    route: '/workshop/ai-landscape',
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI Fundamentals',
    duration: '25 min',
    difficulty: 'Intermediate',
    learningObjective: 'Understand the Agent Loop and reasoning',
    xpReward: 100,
    route: '/workshop/agentic-ai',
  },
  {
    id: 'llm-playground',
    title: 'LLM Intelligence',
    duration: '25 min',
    difficulty: 'Beginner',
    learningObjective: 'Master prompt engineering and LLM parameters',
    xpReward: 100,
    route: '/workshop/llm-playground',
  },
  {
    id: 'rag-playground',
    title: 'RAG Knowledge',
    duration: '30 min',
    difficulty: 'Intermediate',
    learningObjective: 'Build and visualize semantic search pipelines',
    xpReward: 100,
    route: '/workshop/rag-playground',
  },
  {
    id: 'tool-calling',
    title: 'Tool Calling',
    duration: '30 min',
    difficulty: 'Intermediate',
    learningObjective: 'Connect LLMs to external functions',
    xpReward: 100,
    route: '/workshop/tool-calling',
  },
  {
    id: 'agent-builder',
    title: 'Build an Agent',
    duration: '25 min',
    difficulty: 'Advanced',
    learningObjective: 'Assemble a complete Agentic system',
    xpReward: 150,
    route: '/workshop/agent-builder',
  },
  {
    id: 'qualcomm-ai',
    title: 'Optimization & Deployment',
    duration: '15 min',
    difficulty: 'Intermediate',
    learningObjective: 'On-device AI and Qualcomm AI Stack',
    xpReward: 100,
    route: '/workshop/qualcomm-ai',
  },
  {
    id: 'architecture-lab',
    title: 'Final Challenge',
    duration: '15 min',
    difficulty: 'Advanced',
    learningObjective: 'Design a complete enterprise AI system',
    xpReward: 500,
    route: '/workshop/architecture-lab',
  },
];
