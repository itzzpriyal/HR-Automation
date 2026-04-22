import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { 
  Connection, 
  Edge, 
  EdgeChange, 
  Node, 
  NodeChange, 
  addEdge, 
  OnNodesChange, 
  OnEdgesChange, 
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  XYPosition
} from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { WorkflowNodeData, NodeType } from '../types/nodes.types';
import { ValidationError, ExecutionResult } from '../types/workflow.types';
import { createDefaultNodeData, getSampleWorkflow } from '../utils/nodeDefaults';

interface WorkflowState {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  simulationResult: ExecutionResult | null;
  isSimulating: boolean;
  isSandboxOpen: boolean;
  validationErrors: ValidationError[];
  
  // History for undo/redo (simplified version)
  history: Array<{ nodes: Node<WorkflowNodeData>[]; edges: Edge[] }>;
  historyIndex: number;
}

interface WorkflowActions {
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (type: NodeType, position: XYPosition) => void;
  updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => void;
  deleteNode: (nodeId: string) => void;
  setSelectedNode: (nodeId: string | null) => void;
  setSimulationResult: (result: ExecutionResult | null) => void;
  setSimulating: (val: boolean) => void;
  toggleSandbox: () => void;
  setValidationErrors: (errors: ValidationError[]) => void;
  loadSampleWorkflow: () => void;
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
}

export const useWorkflowStore = create<WorkflowState & WorkflowActions>()(
  immer((set, get) => ({
    nodes: [],
    edges: [],
    selectedNodeId: null,
    simulationResult: null,
    isSimulating: false,
    isSandboxOpen: false,
    validationErrors: [],
    history: [],
    historyIndex: -1,

    onNodesChange: (changes: NodeChange[]) => {
      set((state) => {
        state.nodes = applyNodeChanges(changes, state.nodes) as Node<WorkflowNodeData>[];
      });
    },

    onEdgesChange: (changes: EdgeChange[]) => {
      set((state) => {
        state.edges = applyEdgeChanges(changes, state.edges);
      });
    },

    onConnect: (connection: Connection) => {
      set((state) => {
        state.edges = addEdge({ 
          ...connection, 
          animated: false,
          style: { stroke: '#2d3150', strokeWidth: 2 } 
        }, state.edges);
        get().saveToHistory();
      });
    },

    addNode: (type: NodeType, position: XYPosition) => {
      const newNode: Node<WorkflowNodeData> = {
        id: uuidv4(),
        type,
        position,
        data: createDefaultNodeData(type),
      };
      set((state) => {
        state.nodes.push(newNode);
        get().saveToHistory();
      });
    },

    updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => {
      set((state) => {
        const node = state.nodes.find((n) => n.id === nodeId);
        if (node) {
          node.data = { ...node.data, ...data } as WorkflowNodeData;
        }
      });
    },

    deleteNode: (nodeId: string) => {
      set((state) => {
        state.nodes = state.nodes.filter((n) => n.id !== nodeId);
        state.edges = state.edges.filter((e) => e.source !== nodeId && e.target !== nodeId);
        if (state.selectedNodeId === nodeId) state.selectedNodeId = null;
        get().saveToHistory();
      });
    },

    setSelectedNode: (nodeId: string | null) => {
      set((state) => {
        state.selectedNodeId = nodeId;
      });
    },

    setSimulationResult: (result: ExecutionResult | null) => {
      set((state) => {
        state.simulationResult = result;
      });
    },

    setSimulating: (val: boolean) => {
      set((state) => {
        state.isSimulating = val;
      });
    },

    toggleSandbox: () => {
      set((state) => {
        state.isSandboxOpen = !state.isSandboxOpen;
      });
    },

    setValidationErrors: (errors: ValidationError[]) => {
      set((state) => {
        state.validationErrors = errors;
      });
    },

    saveToHistory: () => {
      set((state) => {
        const currentSnapshot = { nodes: state.nodes, edges: state.edges };
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(JSON.parse(JSON.stringify(currentSnapshot)));
        state.historyIndex = state.history.length - 1;
        
        // Limit history size
        if (state.history.length > 50) {
          state.history.shift();
          state.historyIndex--;
        }
      });
    },

    undo: () => {
      set((state) => {
        if (state.historyIndex > 0) {
          state.historyIndex--;
          const snapshot = state.history[state.historyIndex];
          state.nodes = JSON.parse(JSON.stringify(snapshot.nodes));
          state.edges = JSON.parse(JSON.stringify(snapshot.edges));
        }
      });
    },

    redo: () => {
      set((state) => {
        if (state.historyIndex < state.history.length - 1) {
          state.historyIndex++;
          const snapshot = state.history[state.historyIndex];
          state.nodes = JSON.parse(JSON.stringify(snapshot.nodes));
          state.edges = JSON.parse(JSON.stringify(snapshot.edges));
        }
      });
    },

    loadSampleWorkflow: () => {
      const { nodes, edges } = getSampleWorkflow();
      set((state) => {
        state.nodes = nodes as Node<WorkflowNodeData>[];
        state.edges = edges as Edge[];
        state.selectedNodeId = null;
        get().saveToHistory();
      });
    }
  }))
);
