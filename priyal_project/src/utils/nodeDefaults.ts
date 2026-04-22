import { v4 as uuidv4 } from 'uuid';
import { NodeType, WorkflowNodeData } from '../types/nodes.types';

export const createDefaultNodeData = (type: NodeType): WorkflowNodeData => {
  const id = uuidv4();
  const base = { 
    id, 
    label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`, 
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
    status: 'idle' as const 
  };

  switch (type) {
    case 'start':
      return { ...base, type: 'start', title: 'Start Workflow', metadata: [] };
    case 'task':
      return { ...base, type: 'task', title: 'New Task', description: '', assignee: '', dueDate: '', customFields: [] };
    case 'approval':
      return { ...base, type: 'approval', title: 'Manager Approval', approverRole: 'Manager', autoApproveThreshold: 7 };
    case 'automated':
      return { ...base, type: 'automated', title: 'Automated Step', actionId: '', actionLabel: '', parameters: {} };
    case 'end':
      return { ...base, type: 'end', title: 'End Workflow', endMessage: 'Workflow completed successfully.', generateSummary: true };
    default:
      throw new Error(`Unknown node type: ${type}`);
  }
};

export const getSampleWorkflow = () => {
  const nodes: any[] = [
    { id: '1', type: 'start', position: { x: 250, y: 0 }, data: { id: '1', type: 'start', title: 'Start Onboarding', metadata: [], status: 'idle' } },
    { id: '2', type: 'task', position: { x: 250, y: 100 }, data: { id: '2', type: 'task', title: 'Collect Documents', description: 'HR collects IDs and signed contracts', assignee: 'hr@company.com', dueDate: '', customFields: [], status: 'idle' } },
    { id: '3', type: 'task', position: { x: 250, y: 200 }, data: { id: '3', type: 'task', title: 'Background Check', description: 'Run standard background check', assignee: 'security@company.com', dueDate: '', customFields: [], status: 'idle' } },
    { id: '4', type: 'approval', position: { x: 250, y: 320 }, data: { id: '4', type: 'approval', title: 'Manager Approval', approverRole: 'Manager', autoApproveThreshold: 5, status: 'idle' } },
    { id: '5', type: 'automated', position: { x: 0, y: 450 }, data: { id: '5', type: 'automated', title: 'Send Welcome Email', actionId: 'send_email', actionLabel: 'Send Email', parameters: { to: 'newhire@example.com', subject: 'Welcome!' }, status: 'idle' } },
    { id: '6', type: 'task', position: { x: 500, y: 450 }, data: { id: '6', type: 'task', title: 'Notify HR of Rejection', description: 'Inform HR why the manager rejected the candidate', assignee: 'recruiter@company.com', dueDate: '', customFields: [], status: 'idle' } },
    { id: '7', type: 'end', position: { x: 0, y: 580 }, data: { id: '7', type: 'end', title: 'Onboarding Complete', endMessage: 'Onboarding process finished.', generateSummary: true, status: 'idle' } },
    { id: '8', type: 'end', position: { x: 500, y: 580 }, data: { id: '8', type: 'end', title: 'Process Terminated', endMessage: 'Onboarding rejected.', generateSummary: false, status: 'idle' } },
  ];

  const edges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e4-5', source: '4', target: '5', sourceHandle: 'approved', label: 'Approved', style: { stroke: '#22c55e' } },
    { id: 'e4-6', source: '4', target: '6', sourceHandle: 'rejected', label: 'Rejected', style: { stroke: '#f43f5e' } },
    { id: 'e5-7', source: '5', target: '7' },
    { id: 'e6-8', source: '6', target: '8' },
  ];

  return { nodes, edges };
};
