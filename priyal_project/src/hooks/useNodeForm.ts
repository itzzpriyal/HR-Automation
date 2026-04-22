import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWorkflowStore } from './useWorkflowStore';
import { 
  StartNodeSchema, 
  TaskNodeSchema, 
  ApprovalNodeSchema, 
  AutomatedStepSchema, 
  EndNodeSchema 
} from '../types/forms.types';

export const useNodeForm = (nodeId: string, nodeType: string) => {
  const { nodes, updateNodeData } = useWorkflowStore();
  const node = nodes.find((n) => n.id === nodeId);

  const getSchema = () => {
    switch (nodeType) {
      case 'start': return StartNodeSchema;
      case 'task': return TaskNodeSchema;
      case 'approval': return ApprovalNodeSchema;
      case 'automated': return AutomatedStepSchema;
      case 'end': return EndNodeSchema;
      default: return StartNodeSchema;
    }
  };

  const form = useForm({
    resolver: zodResolver(getSchema() as any),
    defaultValues: (node?.data as any) || {},
  });

  // Update form ONLY when selected node changes (by ID)
  useEffect(() => {
    if (node) {
      form.reset(node.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId, form]);

  // Real-time updates to store
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (nodeId) {
        updateNodeData(nodeId, value as any);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, nodeId, updateNodeData]);

  return form;
};
