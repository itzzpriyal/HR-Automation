import React from 'react';
import { NodeProps } from '@xyflow/react';
import { ClipboardList } from 'lucide-react';
import { BaseNode } from './BaseNode';

export const TaskNode: React.FC<NodeProps<any>> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      selected={selected}
      type="task"
      icon={ClipboardList}
      title={data.title || 'Task'}
      description={data.description || 'Manual HR action required'}
      status={data.status}
      colorClass="border-node-task"
    >
      {data.assignee && (
        <div className="mt-2 text-[10px] text-text-secondary italic truncate">
          Assignee: {data.assignee}
        </div>
      )}
    </BaseNode>
  );
};
