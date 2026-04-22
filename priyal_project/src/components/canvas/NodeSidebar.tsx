import React from 'react';
import { Play, ClipboardList, UserCheck, Zap, Square } from 'lucide-react';
import { NodeType } from '../../types/nodes.types';

const NODE_TYPES: { type: NodeType; label: string; desc: string; icon: any; color: string }[] = [
  { type: 'start', label: 'Start', desc: 'Entry point for process', icon: Play, color: 'text-node-start' },
  { type: 'task', label: 'Task', desc: 'Manual HR action', icon: ClipboardList, color: 'text-node-task' },
  { type: 'approval', label: 'Approval', desc: 'Manager/HR sign-off', icon: UserCheck, color: 'text-node-approval' },
  { type: 'automated', label: 'Automated Step', desc: 'System integration', icon: Zap, color: 'text-node-automated' },
  { type: 'end', label: 'End', desc: 'Process completion', icon: Square, color: 'text-node-end' },
];

export const NodeSidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-[240px] bg-panel border-r border-border flex flex-col z-10 shadow-lg">
      <div className="p-4 border-b border-border bg-card">
        <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">Node Palette</h2>
        <p className="text-[10px] text-text-secondary mt-1">Drag nodes to canvas</p>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
        {NODE_TYPES.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.type}
              className="group bg-card border border-border p-3 rounded-lg cursor-grab hover:border-text-secondary transition-all hover:shadow-md active:cursor-grabbing hover:-translate-y-0.5"
              onDragStart={(event) => onDragStart(event, node.type)}
              draggable
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md bg-panel border border-border group-hover:bg-opacity-80 transition-colors`}>
                  <Icon size={16} className={node.color} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">{node.label}</div>
                  <div className="text-[10px] text-text-secondary mt-0.5">{node.desc}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
