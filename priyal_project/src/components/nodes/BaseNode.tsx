import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { LucideIcon, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';

interface BaseNodeProps {
  id: string;
  selected?: boolean;
  type: string;
  icon: LucideIcon;
  title: string;
  description?: string;
  status: 'idle' | 'running' | 'success' | 'error';
  colorClass: string;
  children?: React.ReactNode;
}

export const BaseNode: React.FC<BaseNodeProps> = ({
  id,
  selected,
  type,
  icon: Icon,
  title,
  description,
  status,
  colorClass,
  children,
}) => {
  const validationErrors = useWorkflowStore((state) => state.validationErrors);
  const nodeErrors = validationErrors.filter((e) => e.nodeId === id);
  const hasErrors = nodeErrors.some((e) => e.severity === 'error');
  const hasWarnings = nodeErrors.some((e) => e.severity === 'warning');

  return (
    <div className={`
      relative w-[220px] bg-card rounded-xl border-l-4 ${colorClass} shadow-lg transition-all duration-200
      ${selected ? 'ring-2 ring-offset-2 ring-offset-canvas' : 'border border-border'}
      ${selected ? colorClass.replace('border-', 'ring-') : ''}
    `}>
      {/* Node Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className={`p-1.5 rounded-lg bg-panel border border-border`}>
            <Icon size={16} className={colorClass.replace('border-', 'text-')} />
          </div>
          <Badge variant={status}>{status}</Badge>
        </div>

        <h3 className="text-sm font-semibold text-text-primary truncate">{title}</h3>
        {description && (
          <p className="text-[10px] text-text-secondary mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {children}

        {/* Error/Warning Overlays */}
        {(hasErrors || hasWarnings) && (
          <div className="absolute -top-2 -right-2 flex gap-1">
            <div className={`
              p-1 rounded-full shadow-md
              ${hasErrors ? 'bg-node-end text-white' : 'bg-node-approval text-white'}
            `}>
              <AlertCircle size={12} />
            </div>
          </div>
        )}
      </div>

      {/* Standard Handles */}
      {type !== 'start' && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-border border-2 border-card !-top-1.5"
        />
      )}
      
      {type !== 'end' && type !== 'approval' && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-border border-2 border-card !-bottom-1.5"
        />
      )}
    </div>
  );
};
