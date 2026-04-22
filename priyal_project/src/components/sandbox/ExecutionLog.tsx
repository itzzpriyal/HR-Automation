import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, SkipForward, Play, Clock } from 'lucide-react';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { Badge } from '../ui/Badge';

export const ExecutionLog: React.FC = () => {
  const { simulationResult } = useWorkflowStore();
  const [visibleSteps, setVisibleSteps] = useState<number>(0);

  useEffect(() => {
    if (!simulationResult) {
      setVisibleSteps(0);
      return;
    }

    // Animate steps appearing one by one
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < simulationResult.steps.length) {
        setVisibleSteps(prev => prev + 1);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [simulationResult]);

  if (!simulationResult) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 size={16} className="text-node-start" />;
      case 'error': return <XCircle size={16} className="text-node-end" />;
      case 'skipped': return <SkipForward size={16} className="text-text-secondary" />;
      default: return <Play size={16} className="text-accent-blue" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
        <div>
          <h3 className="font-semibold text-text-primary">Execution Results</h3>
          <p className="text-xs text-text-secondary mt-1">
            {simulationResult.success ? 'Completed successfully' : 'Failed with errors'}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono text-accent-blue font-bold">
            {simulationResult.executionTime}ms
          </div>
          <p className="text-xs text-text-secondary mt-1">{simulationResult.totalSteps} steps</p>
        </div>
      </div>

      <div className="relative pl-4 border-l-2 border-border space-y-6 mt-6 pb-4">
        {simulationResult.steps.slice(0, visibleSteps).map((step, idx) => (
          <div key={idx} className="relative animate-stagger-in">
            {/* Timeline dot */}
            <div className="absolute -left-[21px] top-1 bg-panel rounded-full p-0.5">
              {getStatusIcon(step.status)}
            </div>
            
            <div className="bg-card border border-border rounded-lg p-3 shadow-sm hover:border-accent-blue/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant={step.status as any}>{step.nodeType}</Badge>
                  <span className="text-sm font-semibold text-text-primary">{step.title}</span>
                </div>
                <div className="flex items-center text-[10px] text-text-secondary font-mono gap-1">
                  <Clock size={10} /> {step.duration}ms
                </div>
              </div>
              <p className="text-xs text-text-secondary mt-1">{step.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
