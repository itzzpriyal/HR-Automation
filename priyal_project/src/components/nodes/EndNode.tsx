import React from 'react';
import { Square } from 'lucide-react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const EndNode: React.FC<NodeProps<any>> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      selected={selected}
      type="end"
      icon={Square}
      title={data.title || 'End Workflow'}
      description={data.endMessage}
      status={data.status}
      colorClass="border-node-end"
    />
  );
};
