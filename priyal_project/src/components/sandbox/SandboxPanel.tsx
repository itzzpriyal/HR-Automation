import React, { useState } from 'react';
import { X, Play, Code, CheckCircle, RefreshCcw, Copy } from 'lucide-react';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { useSimulation } from '../../hooks/useSimulation';
import { useWorkflowValidator } from '../../hooks/useWorkflowValidator';
import { serializeWorkflow } from '../../utils/workflowSerializer';
import { ValidationReport } from './ValidationReport';
import { ExecutionLog } from './ExecutionLog';
import { Button } from '../ui/Button';

export const SandboxPanel: React.FC = () => {
  const { isSandboxOpen, toggleSandbox, validationErrors, isSimulating, nodes, edges } = useWorkflowStore();
  const { runSimulation, error: simError } = useSimulation();
  const { validate } = useWorkflowValidator();
  
  const [activeTab, setActiveTab] = useState<'validation' | 'json' | 'log'>('validation');
  const [copied, setCopied] = useState(false);

  if (!isSandboxOpen) return null;

  const hasErrors = validationErrors.some(e => e.severity === 'error');
  const jsonCode = serializeWorkflow(nodes, edges);

  const handleRunSimulation = () => {
    setActiveTab('log');
    runSimulation();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-[400px] bg-panel border-l border-border h-full flex flex-col animate-slide-in-right absolute right-0 top-0 bottom-0 z-30 shadow-2xl">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-card">
        <div>
          <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider flex items-center gap-2">
            <Play size={14} className="text-accent-blue" />
            Sandbox & Test
          </h2>
        </div>
        <button 
          onClick={toggleSandbox}
          className="text-text-secondary hover:text-text-primary p-1 rounded-md hover:bg-border transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex border-b border-border bg-card">
        <button
          className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors ${activeTab === 'validation' ? 'border-accent-blue text-accent-blue' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
          onClick={() => setActiveTab('validation')}
        >
          Validation
        </button>
        <button
          className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors ${activeTab === 'json' ? 'border-accent-blue text-accent-blue' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
          onClick={() => setActiveTab('json')}
        >
          JSON Preview
        </button>
        <button
          className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors ${activeTab === 'log' ? 'border-accent-blue text-accent-blue' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
          onClick={() => setActiveTab('log')}
        >
          Execution Log
        </button>
      </div>
      
      <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
        {activeTab === 'validation' && <ValidationReport />}
        
        {activeTab === 'json' && (
          <div className="relative group">
            <pre className="text-[10px] font-mono text-text-secondary bg-[#0a0c10] p-4 rounded-lg overflow-x-auto border border-border">
              {jsonCode}
            </pre>
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
              onClick={handleCopy}
            >
              {copied ? <CheckCircle size={14} className="text-node-start" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        )}

        {activeTab === 'log' && (
          <>
            {simError && (
              <div className="p-4 mb-4 bg-node-end/10 border border-node-end/20 rounded-lg text-node-end text-sm">
                {simError}
              </div>
            )}
            <ExecutionLog />
            {!isSimulating && useWorkflowStore.getState().simulationResult === null && !simError && (
              <div className="text-center py-10 text-text-secondary">
                <Play size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm">Run simulation to see results here.</p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="p-6 border-t border-border bg-card">
        <Button 
          className="w-full flex items-center justify-center gap-2"
          onClick={handleRunSimulation}
          disabled={hasErrors || isSimulating}
        >
          {isSimulating ? (
            <RefreshCcw size={16} className="animate-spin" />
          ) : (
            <Play size={16} fill="currentColor" />
          )}
          {isSimulating ? 'Simulating...' : 'Run Simulation'}
        </Button>
      </div>
    </div>
  );
};
