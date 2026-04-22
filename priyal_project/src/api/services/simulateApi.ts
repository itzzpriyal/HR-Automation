import { WorkflowGraph, ExecutionResult } from '../../types/workflow.types';

export const simulateWorkflow = async (workflow: WorkflowGraph): Promise<ExecutionResult> => {
  const response = await fetch('/api/simulate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workflow }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0] || 'Simulation failed');
  }
  
  return response.json();
};
