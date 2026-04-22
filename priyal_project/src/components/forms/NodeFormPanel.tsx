import React from 'react';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { WorkflowNodeData } from '../../types/nodes.types';
import { StartNodeForm } from './StartNodeForm';
import { TaskNodeForm } from './TaskNodeForm';
import { ApprovalNodeForm } from './ApprovalNodeForm';
import { AutomatedStepForm } from './AutomatedStepForm';
import { EndNodeForm } from './EndNodeForm';

export const NodeFormPanel: React.FC = () => {
  const { nodes, selectedNodeId, setSelectedNode } = useWorkflowStore();
  
  const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) : null;

  if (!selectedNode) {
    return null; // Hidden when no node is selected
  }

  const nodeData = selectedNode.data as WorkflowNodeData;

  const renderForm = () => {
    switch (nodeData.type) {
      case 'start': return <StartNodeForm nodeId={selectedNode.id} />;
      case 'task': return <TaskNodeForm nodeId={selectedNode.id} />;
      case 'approval': return <ApprovalNodeForm nodeId={selectedNode.id} />;
      case 'automated': return <AutomatedStepForm nodeId={selectedNode.id} />;
      case 'end': return <EndNodeForm nodeId={selectedNode.id} />;
      default: return <div className="text-sm text-text-secondary">Unknown node type</div>;
    }
  };

  return (
    <div className="w-[320px] bg-panel border-l border-border h-full flex flex-col animate-slide-in-right absolute right-0 top-0 bottom-0 z-20 shadow-2xl">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-card">
        <div>
          <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
            Configure Node
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            {nodeData.type.charAt(0).toUpperCase() + nodeData.type.slice(1)} type
          </p>
        </div>
        <button 
          onClick={() => setSelectedNode(null)}
          className="text-text-secondary hover:text-text-primary p-1 rounded-md hover:bg-border transition-colors"
        >
          &times;
        </button>
      </div>
      
      <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
        {renderForm()}
      </div>
    </div>
  );
};
