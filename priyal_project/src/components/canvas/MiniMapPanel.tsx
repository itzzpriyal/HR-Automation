import React from 'react';
import { MiniMap } from '@xyflow/react';

export const MiniMapPanel: React.FC = () => {
  return (
    <MiniMap 
      className="!bg-panel !border !border-border !rounded-lg overflow-hidden shadow-lg"
      nodeStrokeColor="#2d3150"
      nodeColor={(node) => {
        switch (node.type) {
          case 'start': return '#22c55e';
          case 'task': return '#3b82f6';
          case 'approval': return '#f59e0b';
          case 'automated': return '#a855f7';
          case 'end': return '#f43f5e';
          default: return '#1e2130';
        }
      }}
      nodeBorderRadius={4}
      maskColor="rgba(15, 17, 23, 0.7)"
    />
  );
};
