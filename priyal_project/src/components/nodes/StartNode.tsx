import React from 'react';
import { Play } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { NodeProps } from '@xyflow/react';
import { StartNodeData } from '../../types/nodes.types';

export const StartNode: React.FC<NodeProps<any>> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      selected={selected}
      type="start"
      icon={Play}
      title={data.title || 'Start Workflow'}
      status={data.status}
      colorClass="border-node-start"
      description="Entry point for the HR process"
    />
  );
};
