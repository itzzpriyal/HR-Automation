import { useState, useCallback } from 'react';
import { useWorkflowStore } from './useWorkflowStore';
import { simulateWorkflow } from '../api/services/simulateApi';

export const useSimulation = () => {
  const { nodes, edges, setSimulationResult, setSimulating } = useWorkflowStore();
  const [error, setError] = useState<string | null>(null);

  const runSimulation = useCallback(async () => {
    setSimulating(true);
    setError(null);
    setSimulationResult(null);

    try {
      const result = await simulateWorkflow({ nodes, edges });
      setSimulationResult(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred during simulation');
    } finally {
      setSimulating(false);
    }
  }, [nodes, edges, setSimulationResult, setSimulating]);

  return { runSimulation, error };
};
