import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CanvasToolbar } from './components/canvas/CanvasToolbar';
import { NodeSidebar } from './components/canvas/NodeSidebar';
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas';
import { NodeFormPanel } from './components/forms/NodeFormPanel';
import { SandboxPanel } from './components/sandbox/SandboxPanel';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ReactFlowProvider>
      <div className="flex flex-col h-screen w-screen bg-canvas overflow-hidden font-sans text-text-primary">
        {/* Top Header/Toolbar */}
        <CanvasToolbar />

        <div className="flex flex-1 overflow-hidden relative">
          {/* Left Palette */}
          <NodeSidebar />

          {/* Main Visual Builder */}
          <main className="flex-1 relative bg-canvas">
            <ErrorBoundary>
              <WorkflowCanvas />
            </ErrorBoundary>
          </main>

          {/* Right Configuration Panel (Slides in) */}
          <NodeFormPanel />

          {/* Sandbox/Simulation Drawer (Slides in/Overlays) */}
          <SandboxPanel />
        </div>
      </div>
    </ReactFlowProvider>
    </ErrorBoundary>
  );
};

export default App;
