export interface RagDocument {
  id: string;
  title: string;
  category: string;
  content: string;
  url: string;
}

export interface RetrievedChunk {
  document: RagDocument;
  score: number;
  highlight: string;
}

const QUALCOMM_KNOWLEDGE_BASE: RagDocument[] = [
  {
    id: 'doc-1',
    title: 'Qualcomm AI Hub',
    category: 'Platform',
    content: 'Qualcomm AI Hub provides a library of pre-optimized AI models that can be seamlessly deployed across devices powered by Snapdragon and Qualcomm platforms. It simplifies the AI integration process for developers, allowing rapid deployment and scaling.',
    url: 'https://aihub.qualcomm.com/',
  },
  {
    id: 'doc-2',
    title: 'Hexagon NPU',
    category: 'Hardware',
    content: 'The Hexagon NPU is designed to deliver industry-leading performance and power efficiency for AI workloads on device. It features a scalar, vector, and tensor accelerator designed for complex machine learning tasks like generative AI.',
    url: 'https://www.qualcomm.com/artificial-intelligence',
  },
  {
    id: 'doc-3',
    title: 'On-device AI',
    category: 'Concept',
    content: 'On-device AI executes machine learning models locally on the device (smartphone, PC, automotive) rather than in the cloud. This provides benefits including enhanced privacy, reduced latency, lower cloud costs, and offline capability.',
    url: 'https://www.qualcomm.com/artificial-intelligence',
  },
  {
    id: 'doc-4',
    title: 'Agentic AI',
    category: 'Concept',
    content: 'Agentic AI refers to systems where an AI agent can reason, plan, use tools, and take autonomous actions to achieve complex goals, going beyond simple conversational generation or predefined workflows.',
    url: 'https://www.qualcomm.com/developer/artificial-intelligence',
  }
];

export async function simulateRetrieval(query: string, topK: number = 3): Promise<RetrievedChunk[]> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const queryLower = query.toLowerCase();
  
  // Simple keyword matching heuristic for demo purposes
  const scored = QUALCOMM_KNOWLEDGE_BASE.map(doc => {
    let score = 0.5; // Base relevance
    if (doc.title.toLowerCase().includes(queryLower)) score += 0.4;
    if (doc.content.toLowerCase().includes(queryLower)) score += 0.3;
    
    // Add random noise to make it feel organic
    score += (Math.random() * 0.1);
    
    return {
      document: doc,
      score: Math.min(score, 0.99),
      highlight: doc.content.substring(0, 150) + '...'
    };
  });
  
  // Sort by score and take top K
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
