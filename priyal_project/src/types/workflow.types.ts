import { Node, Edge } from '@xyflow/react';
import { WorkflowNodeData, NodeType } from './nodes.types';

export interface ValidationError {
  nodeId?: string;
  severity: 'error' | 'warning';
  message: string;
}

export interface WorkflowGraph {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
}

export interface ExecutionStep {
  nodeId: string;
  nodeType: string;
  title: string;
  status: 'success' | 'error' | 'skipped';
  message: string;
  timestamp: string;
  duration: number; // ms
}

export interface ExecutionResult {
  success: boolean;
  totalSteps: number;
  executionTime: number; // ms
  steps: ExecutionStep[];
  errors: string[];
}
