# HR Workflow Designer

A production-grade, visual no-code workflow builder for HR processes (onboarding, leave approval, document verification) built with React, React Flow, and TypeScript.

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run in development mode:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🏗️ Folder Structure

- `src/api`: Contains API related logic.
  - `mocks/`: MSW handlers and mock data for `GET /automations` and `POST /simulate`.
  - `services/`: API client services for fetching automations and running simulations.
  - `types/`: API-specific type definitions.
- `src/components`: UI components organized by feature.
  - `canvas/`: Main workflow builder components (Canvas, Toolbar, Sidebar, MiniMap).
  - `nodes/`: Custom React Flow node implementations (Start, Task, Approval, AutomatedStep, End).
  - `forms/`: Node configuration forms using React Hook Form + Zod.
  - `sandbox/`: Simulation results, execution logs, and validation reports.
  - `ui/`: Reusable primitive UI components (Button, Input, Badge, etc.).
- `src/store`: Zustand store for central state management (Nodes, Edges, Simulation, History).
- `src/hooks`: Custom hooks for workflow logic, validation, and form handling.
- `src/utils`: Helper functions for graph algorithms, serialization, and node defaults.

## 🛠️ Design Decisions

### Zustand for Global State
We chose **Zustand** over React Context for several reasons:
- **Performance**: Zustand allows for fine-grained subscriptions, which is critical in a node-based editor where re-rendering the entire canvas on every state change would be costly.
- **Simplicity**: It provides a cleaner API for handling complex actions and side effects (like undo/redo) without the boilerplate of Redux or the nesting issues of multiple Contexts.
- **DevTools Integration**: Excellent support for debugging complex state transitions.

### MSW (Mock Service Worker) for API Mocking
**MSW** was chosen over a separate tool like `json-server` because:
- **Zero-setup**: It runs entirely in the browser, eliminating the need for a separate process or backend configuration.
- **Realistic Traversal**: Allows us to implement complex simulation logic (like topological graph traversal and random approval logic) directly in a "mock" that behaves like a real server.
- **Intercepts native Fetch**: No special client configuration needed; it intercepts standard `fetch` calls.

### React Hook Form + Zod
- **Performance**: Uncontrolled inputs in React Hook Form prevent unnecessary re-renders during typing.
- **Validation**: Zod provides a single source of truth for our data schemas, ensuring that the graph state and the configuration forms are always in sync and valid.

## ✨ Features

- **Visual Workflow Builder**: Interactive drag-and-drop canvas powered by React Flow.
- **Complex Branching**: Approval nodes with dedicated "Approved" and "Rejected" output handles.
- **Graph Validation Engine**: Detects cycles, unreachable nodes, and structural inconsistencies.
- **Live Simulation**: Step-by-step animated execution timeline with realistic delays.
- **Undo/Redo**: Full history support using custom Zustand middleware.
- **Import/Export**: Save and load workflow configurations as JSON files.

## ⚠️ What I'd add with more time
- **Persistent Storage**: Implement LocalStorage or IndexedDB persistence so users don't lose progress on refresh.
- **Node Templates**: Allow users to save custom configured nodes as reusable templates.
- **Collaborative Editing**: Add WebSockets (e.g., via Yjs) for multi-user collaboration.
- **Expression Builder**: A more advanced UI for conditional logic beyond simple Approval nodes.
- **Unit/Integration Tests**: Comprehensive test suite using Vitest and React Testing Library.
