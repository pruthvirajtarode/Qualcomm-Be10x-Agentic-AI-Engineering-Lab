export type AgentTraceStep = {
  id: string;
  component: 'USER' | 'PLANNER' | 'RETRIEVER' | 'TOOL' | 'MEMORY' | 'LLM' | 'FINAL';
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'WARNING' | 'ERROR';
  message: string;
  details?: string;
  latency?: number;
};

export async function simulateAgentExecution(
  goal: string, 
  onStep: (step: AgentTraceStep) => void
): Promise<string> {
  const steps: Omit<AgentTraceStep, 'id'>[] = [
    { component: 'USER', status: 'SUCCESS', message: `Goal received: "${goal}"` },
    { component: 'PLANNER', status: 'RUNNING', message: 'Analyzing task and generating execution plan...' },
    { component: 'PLANNER', status: 'SUCCESS', message: 'Plan created: [1] Retrieve context [2] Execute tools [3] Formulate answer', latency: 450 },
    { component: 'RETRIEVER', status: 'RUNNING', message: 'Searching enterprise knowledge base...' },
    { component: 'RETRIEVER', status: 'SUCCESS', message: 'Retrieved 3 highly relevant documents', details: 'Top match: Qualcomm AI Hub (0.92)', latency: 850 },
    { component: 'TOOL', status: 'RUNNING', message: 'Selecting appropriate tool for computation...' },
    { component: 'TOOL', status: 'SUCCESS', message: 'Executed calculator tool', details: 'Input: latency * requests, Result: 1500ms', latency: 320 },
    { component: 'MEMORY', status: 'SUCCESS', message: 'Saved execution trace to short-term memory', latency: 50 },
    { component: 'LLM', status: 'RUNNING', message: 'Synthesizing final response grounded in retrieved context...' },
    { component: 'FINAL', status: 'SUCCESS', message: 'Response generation complete', latency: 1200 },
  ];

  let currentStepId = 0;
  
  for (const step of steps) {
    currentStepId++;
    const stepWithId = { ...step, id: `step-${currentStepId}` } as AgentTraceStep;
    
    onStep(stepWithId);
    
    // If the step was marked RUNNING, simulate wait then update to SUCCESS
    if (step.status === 'RUNNING') {
      const waitTime = step.latency || 500 + Math.random() * 500;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      // In a real implementation we'd emit an update to this step, 
      // but for this demo sequence we just emit the next SUCCESS step directly 
      // since our mocked sequence contains the running/success pairs.
    } else {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  return "Based on the retrieved context from Qualcomm AI Hub and the tool execution results, the optimal architecture involves leveraging the Hexagon NPU for on-device generative tasks, falling back to cloud APIs only for complex reasoning steps. This reduces latency by 45% while preserving enterprise data privacy.";
}
