#  FlowForge HR — Visual HR Workflow Automation Engine

FlowForge HR is a production-grade, no-code workflow builder for designing, validating, and simulating HR processes such as onboarding, leave approvals, and document verification.

It provides a powerful visual interface where users can construct workflow graphs using drag-and-drop nodes, configure logic dynamically, and test execution through a built-in simulation engine — all without writing a single line of backend code.

---

##  Demo Overview

* Drag nodes → Connect workflows → Configure logic → Validate → Simulate execution
* Fully client-side (no backend required)
* Real-time feedback with execution timeline

---

##  Features

### Visual Workflow Builder

* Drag-and-drop node-based canvas using React Flow
* Interactive edges with animated transitions
* Mini-map, zoom controls, and node selection

###  Rich Node System

* Start Node
* Task Node
* Approval Node (with Approved / Rejected branches)
* Automated Step Node (API-driven actions)
* End Node

Each node supports dynamic configuration via forms.

---

###  Dynamic Configuration Panel

* Built with React Hook Form + Zod
* Real-time updates (no save button needed)
* Supports dynamic fields (e.g., automation parameters)

---

###  Workflow Validation Engine

Ensures structural correctness:

* Exactly one Start node
* At least one End node
* No cycles (DFS-based detection)
* All nodes reachable from Start
* Approval nodes must have both branches
* Node-level validation errors

---

###  Simulation Sandbox

* Execute workflows with mock API
* Step-by-step execution timeline
* Status tracking: success / error / skipped
* Execution logs with timestamps and durations
* Validation check before simulation

---

###  Mock API Layer (MSW)

* Simulates backend endpoints:

  * `GET /automations`
  * `POST /simulate`
* No external server required
* Realistic execution behavior

---

###  State Management

* Zustand for global state
* Undo / Redo support using middleware
* Efficient updates without unnecessary re-renders

---

###  Import / Export

* Export workflows as JSON
* Import workflows from JSON files
* Useful for sharing and persistence

---

##  Tech Stack

| Category           | Technology                   |
| ------------------ | ---------------------------- |
| Frontend           | React 18 + Vite + TypeScript |
| Graph Engine       | React Flow (@xyflow/react)   |
| Styling            | TailwindCSS                  |
| State Management   | Zustand                      |
| Forms & Validation | React Hook Form + Zod        |
| API Mocking        | MSW (Mock Service Worker)    |
| Utilities          | date-fns, Lucide Icons       |

---

##  Project Structure

```
src/
├── api/                # Mock APIs and services
├── components/         # UI components (canvas, nodes, forms)
├── hooks/              # Custom hooks (state, validation, simulation)
├── store/              # Zustand store
├── types/              # TypeScript interfaces
├── utils/              # Graph + workflow utilities
└── App.tsx
```

---

##  Architecture Overview

### 🔹 Why Zustand over Context?

* Better performance (avoids unnecessary re-renders)
* Simpler global state management
* Middleware support (undo/redo)

### 🔹 Why MSW over json-server?

* No separate backend process required
* Intercepts network requests directly
* Ideal for frontend-only simulation

### 🔹 Why React Hook Form?

* High performance (uncontrolled inputs)
* Minimal re-renders
* Easy integration with Zod

### 🔹 Why Zod?

* Single source of truth for validation
* Strong TypeScript integration
* Declarative schemas

---

##  Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run development server

```bash
npm run dev
```

### 3️⃣ Open in browser

```
http://localhost:5173
```

---

##  Sample Workflow

**Employee Onboarding Flow:**

Start
→ Collect Documents
→ Background Check
→ Manager Approval

* ✅ Approved → Send Welcome Email → End
* ❌ Rejected → Notify HR → End

---

##  Key Highlights

* Fully no-code workflow builder
* Real-time validation + simulation
* Strong type safety (TypeScript strict mode)
* Modular and scalable architecture
* Clean UI with dark theme

---

##  Future Enhancements

* Backend integration (real execution engine)
* Authentication & user roles
* Workflow persistence (database)
* Real-time collaboration
* Analytics dashboard (execution insights)

---

##  Known Limitations

* No persistent storage (data resets on refresh)
* Simulation is mocked (not real execution)
* Single-user environment (no collaboration)

## 👨‍💻 Author

**Priyal Gupta**
* Interested in ML, backend systems, and automation tools

---
