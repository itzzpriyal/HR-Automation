import React from 'react';
import { Zap } from 'lucide-react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const AutomatedStepNode: React.FC<NodeProps<any>> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      selected={selected}
      type="automated"
      icon={Zap}
      title={data.title || 'Automated Step'}
      description={data.actionLabel || 'Select an action...'}
      status={data.status}
      colorClass="border-node-automated"
    />
  );
};
