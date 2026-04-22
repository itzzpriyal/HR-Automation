# FlowForge HR — Visual HR Workflow Automation Engine

FlowForge HR is a production-grade, no-code workflow builder for designing, validating, and simulating HR processes such as onboarding, leave approvals, and document verification.

It provides a powerful visual interface where users can construct workflow graphs using drag-and-drop nodes, configure logic dynamically, and test execution through a built-in simulation engine — all without writing a single line of backend code.

---

## Architecture

The system follows a modular, frontend-centric architecture:

* **Presentation Layer**
  Built with React + TypeScript + TailwindCSS for a responsive UI.

* **Workflow Engine (Core Logic)**
  Uses React Flow to represent workflows as directed graphs (nodes + edges).

* **State Management Layer**
  Zustand manages global state with undo/redo support and minimal re-renders.

* **Validation Engine**
  Custom logic ensures workflow correctness (cycle detection, node constraints, reachability).

* **Simulation Engine**
  Executes workflows step-by-step using a mocked backend (MSW).

---

## How to Run

### Clone the repository

```bash id="6j2srm"
git clone https://github.com/your-username/HR-Automation.git
cd HR-Automation
```

### Install dependencies

```bash id="y2fj34"
npm install
```

### Start development server

```bash id="8rkx1n"
npm run dev
```

### Open in browser

```id="knn9yd"
http://localhost:5173
```

---

## Design Decisions

* React Flow chosen for efficient graph-based workflow visualization
* Zustand over Context API for better performance and scalability
* React Hook Form + Zod for type-safe, scalable form handling
* MSW (Mock Service Worker) to simulate backend APIs without needing a real server
* Modular architecture to support easy extension (new node types, rules, APIs)

---

## What Was Completed

* Visual drag-and-drop workflow builder
* Multiple node types (Start, Task, Approval, Automation, End)
* Dynamic node configuration panel
* Workflow validation system (cycle detection, structural rules)
* Simulation engine with execution timeline and logs
* Import/Export workflows as JSON

---

## What Could Be Added (Future Work)

* Backend integration for real workflow execution
* User authentication and role-based access
* Persistent storage (database integration)
* Real-time collaboration (multi-user editing)
* Advanced analytics dashboard for workflow insights

---

## Demo Overview

* Drag nodes → Connect workflows → Configure logic → Validate → Simulate execution
* Fully client-side (no backend required)
* Real-time feedback with execution timeline

---

## Features

### Visual Workflow Builder

* Drag-and-drop node-based canvas using React Flow
* Interactive edges with animated transitions
* Mini-map, zoom controls, and node selection

### Node System

* Start Node
* Task Node
* Approval Node (with Approved / Rejected branches)
* Automated Step Node (API-driven actions)
* End Node

### Dynamic Configuration Panel

* Built with React Hook Form + Zod
* Real-time updates (no save button needed)

### Workflow Validation Engine

* Exactly one Start node
* At least one End node
* No cycles
* All nodes reachable
* Approval nodes must have both branches

### Simulation Sandbox

* Step-by-step execution timeline
* Status tracking and logs

### Mock API Layer (MSW)

* Simulated backend APIs
* No external server required

### State Management

* Zustand with undo/redo support

### Import / Export

* JSON-based workflow sharing

---

## Tech Stack

React 18 + Vite + TypeScript
React Flow (@xyflow/react)
TailwindCSS
Zustand
React Hook Form + Zod
MSW
date-fns, Lucide Icons

---

## Project Structure

```id="5xtp02"
src/
├── api/
├── components/
├── hooks/
├── store/
├── types/
├── utils/
└── App.tsx
```

---

## Known Limitations

* No persistent storage
* Simulation is mocked
* Single-user environment

---

## License

MIT License
## Author

Priyal Gupta
