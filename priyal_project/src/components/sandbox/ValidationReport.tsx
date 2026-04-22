import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { Button } from '../ui/Button';

export const ValidationReport: React.FC = () => {
  const { validationErrors, setSelectedNode } = useWorkflowStore();

  const errors = validationErrors.filter(e => e.severity === 'error');
  const warnings = validationErrors.filter(e => e.severity === 'warning');

  if (validationErrors.length === 0) {
    return (
      <div className="flex items-center gap-3 p-4 bg-node-start/10 border border-node-start/20 rounded-lg text-node-start">
        <CheckCircle size={20} />
        <div>
          <h4 className="font-semibold text-sm">Workflow is valid</h4>
          <p className="text-xs opacity-80">Ready for simulation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {errors.length > 0 && (
        <div className="p-4 bg-node-end/10 border border-node-end/20 rounded-lg text-node-end">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={18} />
            <h4 className="font-semibold text-sm">{errors.length} Error{errors.length > 1 ? 's' : ''}</h4>
          </div>
          <ul className="space-y-2">
            {errors.map((err, i) => (
              <li key={i} className="text-xs flex items-start justify-between">
                <span>{err.message}</span>
                {err.nodeId && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedNode(err.nodeId!)}
                    className="text-[10px] h-5 px-2 bg-node-end/20 hover:bg-node-end/30 text-node-end"
                  >
                    Fix
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="p-4 bg-node-approval/10 border border-node-approval/20 rounded-lg text-node-approval">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} />
            <h4 className="font-semibold text-sm">{warnings.length} Warning{warnings.length > 1 ? 's' : ''}</h4>
          </div>
          <ul className="space-y-2">
            {warnings.map((warn, i) => (
              <li key={i} className="text-xs flex items-start justify-between">
                <span>{warn.message}</span>
                {warn.nodeId && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedNode(warn.nodeId!)}
                    className="text-[10px] h-5 px-2 bg-node-approval/20 hover:bg-node-approval/30 text-node-approval"
                  >
                    View
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
