import { useCallback } from 'react';
import { useWorkflowStore } from './useWorkflowStore';
import { ValidationError } from '../types/workflow.types';
import { hasCycle, getUnreachableNodes } from '../utils/graphUtils';

export const useWorkflowValidator = () => {
  const { nodes, edges } = useWorkflowStore();

  const validate = useCallback((): ValidationError[] => {
    const errors: ValidationError[] = [];
    const startNodes = nodes.filter((n) => n.data.type === 'start');
    const endNodes = nodes.filter((n) => n.data.type === 'end');

    // 1. Exactly one start node
    if (startNodes.length === 0) {
      errors.push({ severity: 'error', message: 'Workflow must have a Start node' });
    } else if (startNodes.length > 1) {
      startNodes.forEach(n => {
        errors.push({ nodeId: n.id, severity: 'error', message: 'Only one Start node is allowed' });
      });
    }

    // 2. At least one end node
    if (endNodes.length === 0) {
      errors.push({ severity: 'error', message: 'Workflow must have at least one End node' });
    }

    // 3. Start node incoming edges
    startNodes.forEach((n) => {
      const incoming = edges.filter((e) => e.target === n.id);
      if (incoming.length > 0) {
        errors.push({ nodeId: n.id, severity: 'error', message: 'Start node cannot have incoming edges' });
      }
    });

    // 4. End node outgoing edges
    endNodes.forEach((n) => {
      const outgoing = edges.filter((e) => e.source === n.id);
      if (outgoing.length > 0) {
        errors.push({ nodeId: n.id, severity: 'error', message: 'End node cannot have outgoing edges' });
      }
    });

    // 5. Reachability
    if (startNodes.length === 1) {
      const unreachable = getUnreachableNodes(startNodes[0].id, nodes, edges);
      unreachable.forEach((id) => {
        errors.push({ nodeId: id, severity: 'warning', message: 'Node is unreachable from Start' });
      });
    }

    // 6. Cycles
    if (hasCycle(nodes, edges)) {
      errors.push({ severity: 'error', message: 'Workflow contains cycles' });
    }

    // 7. Node specific validations
    nodes.forEach((n) => {
      if (n.data.type === 'approval') {
        const hasApproved = edges.some((e) => e.source === n.id && e.sourceHandle === 'approved');
        const hasRejected = edges.some((e) => e.source === n.id && e.sourceHandle === 'rejected');
        if (!hasApproved || !hasRejected) {
          errors.push({ 
            nodeId: n.id, 
            severity: 'error', 
            message: 'Approval node must have both Approved and Rejected paths' 
          });
        }
      }
      
      if (n.data.type === 'task' && !n.data.title) {
        errors.push({ nodeId: n.id, severity: 'error', message: 'Task node must have a title' });
      }
    });

    return errors;
  }, [nodes, edges]);

  return { validate };
};
