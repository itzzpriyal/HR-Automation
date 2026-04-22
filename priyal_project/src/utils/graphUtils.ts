import { Node, Edge } from '@xyflow/react';

export const hasCycle = (nodes: Node[], edges: Edge[]): boolean => {
  const adj = new Map<string, string[]>();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    if (adj.has(e.source)) {
      adj.get(e.source)!.push(e.target);
    }
  });

  const visited = new Set<string>();
  const recStack = new Set<string>();

  const dfs = (u: string): boolean => {
    visited.add(u);
    recStack.add(u);

    const neighbors = adj.get(u) || [];
    for (const v of neighbors) {
      if (!visited.has(v)) {
        if (dfs(v)) return true;
      } else if (recStack.has(v)) {
        return true;
      }
    }

    recStack.delete(u);
    return false;
  };

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) return true;
    }
  }

  return false;
};

export const getUnreachableNodes = (startNodeId: string, nodes: Node[], edges: Edge[]): string[] => {
  const adj = new Map<string, string[]>();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    if (adj.has(e.source)) {
      adj.get(e.source)!.push(e.target);
    }
  });

  const reachable = new Set<string>();
  const queue = [startNodeId];
  reachable.add(startNodeId);

  while (queue.length > 0) {
    const u = queue.shift()!;
    const neighbors = adj.get(u) || [];
    for (const v of neighbors) {
      if (!reachable.has(v)) {
        reachable.add(v);
        queue.push(v);
      }
    }
  }

  return nodes.filter((n) => !reachable.has(n.id)).map((n) => n.id);
};
