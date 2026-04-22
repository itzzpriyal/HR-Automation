import { Node, Edge } from '@xyflow/react';
import { WorkflowGraph } from '../types/workflow.types';
import { WorkflowNodeData } from '../types/nodes.types';

export const serializeWorkflow = (nodes: Node<WorkflowNodeData>[], edges: Edge[]): string => {
  const workflow: WorkflowGraph = { nodes, edges };
  return JSON.stringify(workflow, null, 2);
};

export const downloadWorkflow = (nodes: Node<WorkflowNodeData>[], edges: Edge[], fileName: string = 'workflow.json') => {
  const json = serializeWorkflow(nodes, edges);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const parseWorkflow = (json: string): WorkflowGraph => {
  const parsed = JSON.parse(json);
  if (!parsed.nodes || !parsed.edges) {
    throw new Error('Invalid workflow file format');
  }
  return parsed;
};
