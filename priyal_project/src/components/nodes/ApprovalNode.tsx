import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { UserCheck } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const ApprovalNode: React.FC<NodeProps<any>> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      selected={selected}
      type="approval"
      icon={UserCheck}
      title={data.title || 'Approval'}
      description={`Required from ${data.approverRole || 'Manager'}`}
      status={data.status}
      colorClass="border-node-approval"
    >
      {/* Custom Source Handles for Approved/Rejected */}
      <div className="relative mt-4 flex justify-between h-4">
        <div className="flex flex-col items-center">
          <Handle
            type="source"
            position={Position.Bottom}
            id="approved"
            className="w-3 h-3 bg-node-start border-2 border-card !static !transform-none"
          />
          <span className="text-[8px] text-node-start font-bold uppercase mt-1">Approve</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Handle
            type="source"
            position={Position.Bottom}
            id="rejected"
            className="w-3 h-3 bg-node-end border-2 border-card !static !transform-none"
          />
          <span className="text-[8px] text-node-end font-bold uppercase mt-1">Reject</span>
        </div>
      </div>
    </BaseNode>
  );
};
