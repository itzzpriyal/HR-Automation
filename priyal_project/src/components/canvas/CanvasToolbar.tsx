import React, { useRef } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Download, 
  Upload, 
  Undo, 
  Redo, 
  FileJson,
  AlertCircle
} from 'lucide-react';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { useWorkflowValidator } from '../../hooks/useWorkflowValidator';
import { downloadWorkflow, parseWorkflow } from '../../utils/workflowSerializer';
import { Button } from '../ui/Button';

export const CanvasToolbar: React.FC = () => {
  const { 
    nodes, 
    edges, 
    toggleSandbox, 
    setValidationErrors, 
    validationErrors,
    loadSampleWorkflow,
    undo,
    redo,
    historyIndex,
    history,
    onNodesChange,
    onEdgesChange
  } = useWorkflowStore();
  
  const { validate } = useWorkflowValidator();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const errorCount = validationErrors.filter(e => e.severity === 'error').length;

  const handleValidate = () => {
    const errors = validate();
    setValidationErrors(errors);
  };

  const handleExport = () => {
    downloadWorkflow(nodes, edges);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = event.target?.result as string;
        const { nodes: parsedNodes, edges: parsedEdges } = parseWorkflow(json);
        
        // Basic reset via Zustand
        useWorkflowStore.setState({
          nodes: parsedNodes,
          edges: parsedEdges,
          selectedNodeId: null,
          validationErrors: []
        });
        useWorkflowStore.getState().saveToHistory();
      } catch (err) {
        alert('Invalid workflow file');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="h-14 bg-card border-b border-border flex items-center justify-between px-4 z-10 relative shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-panel rounded-lg p-1 border border-border">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={undo} 
            disabled={historyIndex <= 0}
            title="Undo"
          >
            <Undo size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={redo} 
            disabled={historyIndex >= history.length - 1}
            title="Redo"
          >
            <Redo size={16} />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2"></div>

        <Button variant="secondary" size="sm" onClick={loadSampleWorkflow}>
          <FileJson size={14} className="mr-2" />
          Load Sample
        </Button>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium text-text-secondary">
        <div>Nodes: <span className="text-text-primary">{nodes.length}</span></div>
        <div>Edges: <span className="text-text-primary">{edges.length}</span></div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={handleExport} title="Export JSON">
          <Download size={14} />
        </Button>
        
        <input 
          type="file" 
          accept=".json" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleImport} 
        />
        <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} title="Import JSON">
          <Upload size={14} />
        </Button>

        <div className="w-px h-6 bg-border mx-2"></div>

        <Button 
          variant="secondary" 
          size="sm" 
          onClick={handleValidate}
          className="relative"
        >
          {errorCount > 0 ? (
            <AlertCircle size={14} className="mr-2 text-node-end" />
          ) : (
            <CheckCircle2 size={14} className="mr-2 text-node-start" />
          )}
          Validate
          {errorCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-node-end text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {errorCount}
            </span>
          )}
        </Button>
        
        <Button size="sm" onClick={toggleSandbox}>
          <Play size={14} className="mr-2" fill="currentColor" />
          Run Simulation
        </Button>
      </div>
    </div>
  );
};
