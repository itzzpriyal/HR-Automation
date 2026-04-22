export type NodeStatus = 'idle' | 'running' | 'success' | 'error';

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface BaseNodeData {
  id: string;
  label: string;
  title: string;
  status: NodeStatus;
  [key: string]: unknown;
}

export interface StartNodeData extends BaseNodeData {
  type: 'start';
  title: string;
  metadata: Array<{ key: string; value: string }>;
}

export interface TaskNodeData extends BaseNodeData {
  type: 'task';
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: Array<{ key: string; value: string }>;
}

export type ApproverRole = 'Manager' | 'HRBP' | 'Director' | 'CEO';

export interface ApprovalNodeData extends BaseNodeData {
  type: 'approval';
  title: string;
  approverRole: ApproverRole;
  autoApproveThreshold: number; // days
}

export interface AutomatedStepNodeData extends BaseNodeData {
  type: 'automated';
  title: string;
  actionId: string;     // from GET /automations
  actionLabel: string;
  parameters: Record<string, string>; // dynamic from action definition
}

export interface EndNodeData extends BaseNodeData {
  type: 'end';
  endMessage: string;
  generateSummary: boolean;
}

export type WorkflowNodeData = 
  | StartNodeData 
  | TaskNodeData 
  | ApprovalNodeData 
  | AutomatedStepNodeData 
  | EndNodeData;
