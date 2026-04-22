import React, { useCallback, useRef, useMemo } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls,
  useReactFlow,
  Panel
} from '@xyflow/react';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { StartNode } from '../nodes/StartNode';
import { TaskNode } from '../nodes/TaskNode';
import { ApprovalNode } from '../nodes/ApprovalNode';
import { AutomatedStepNode } from '../nodes/AutomatedStepNode';
import { EndNode } from '../nodes/EndNode';
import { NodeType } from '../../types/nodes.types';
import { MiniMapPanel } from './MiniMapPanel';

const NODE_TYPES_MAP: any = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedStepNode,
  end: EndNode,
};

export const WorkflowCanvas: React.FC = () => {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    addNode,
    setSelectedNode,
    isSimulating
  } = useWorkflowStore();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(type, position);
    },
    [screenToFlowPosition, addNode]
  );

  const onSelectionChange = useCallback(({ nodes }: { nodes: any[] }) => {
    if (nodes.length === 1) {
      setSelectedNode(nodes[0].id);
    } else if (nodes.length === 0) {
      setSelectedNode(null);
    }
  }, [setSelectedNode]);

  // Handle delete key
  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      // Deletion is handled by React Flow natively, 
      // but we need to intercept if we wanted custom logic.
      // Zustand store will get the 'remove' changes via onNodesChange.
    }
  }, []);

  // Modify edges to be animated during simulation
  const displayEdges = useMemo(() => edges.map(edge => ({
    ...edge,
    animated: isSimulating,
  })), [edges, isSimulating]);

  const nodeTypes = useMemo(() => NODE_TYPES_MAP, []);

  return (
    <div className="flex-1 h-full w-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={displayEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes as any}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onSelectionChange={onSelectionChange}
        onKeyDown={onKeyDown}
        fitView
        proOptions={{ hideAttribution: true }}
        deleteKeyCode={['Backspace', 'Delete']}
        multiSelectionKeyCode={['Control', 'Meta']}
        selectionOnDrag
      >
        <Background color="#2d3150" gap={16} size={1} />
        
        <Panel position="bottom-right" className="!bottom-4 !right-4 flex flex-col gap-4">
          <Controls 
            className="!bg-panel !border !border-border !shadow-lg !rounded-lg overflow-hidden [&>button]:!bg-panel [&>button]:!border-b-border [&>button]:!text-text-secondary hover:[&>button]:!text-text-primary [&>button]:transition-colors" 
            showInteractive={false}
          />
          <MiniMapPanel />
        </Panel>
      </ReactFlow>

      {nodes.length === 0 && (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-text-secondary">
          <div className="w-16 h-16 mb-4 rounded-full border-2 border-dashed border-border flex items-center justify-center bg-panel">
            <span className="text-2xl opacity-50">+</span>
          </div>
          <p className="font-medium text-lg">Empty Canvas</p>
          <p className="text-sm opacity-80 mt-1">Drop nodes here to start building</p>
        </div>
      )}
    </div>
  );
};
