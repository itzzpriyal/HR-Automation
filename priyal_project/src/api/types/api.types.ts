export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

export interface SimulateRequest {
  workflow: {
    nodes: any[];
    edges: any[];
  };
}
