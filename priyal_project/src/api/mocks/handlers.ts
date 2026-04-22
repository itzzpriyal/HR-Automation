import { http, HttpResponse, delay } from 'msw';
import { mockAutomations } from './automations';
import { ExecutionResult, ExecutionStep } from '../../types/workflow.types';

export const handlers = [
  http.get('/api/automations', () => {
    return HttpResponse.json(mockAutomations);
  }),

  http.post('/api/simulate', async ({ request }) => {
    const { workflow } = await request.json() as any;
    const { nodes, edges } = workflow;

    await delay(Math.random() * 800 + 800);

    const startNode = nodes.find((n: any) => n.data.type === 'start');
    if (!startNode) {
      return HttpResponse.json({
        success: false,
        errors: ['Workflow must have a Start node'],
        steps: [],
        totalSteps: 0,
        executionTime: 0
      }, { status: 400 });
    }

    // Simple simulation: Topological sort or just sequential for mock
    // For the sake of mock, we'll traverse and generate steps
    const steps: ExecutionStep[] = [];
    const visited = new Set();
    const queue = [startNode];
    let totalTime = 0;

    while (queue.length > 0) {
      const node = queue.shift();
      if (!node || visited.has(node.id)) continue;
      visited.add(node.id);

      const stepDuration = Math.floor(Math.random() * 200 + 100);
      totalTime += stepDuration;

      let message = `Executed ${node.data.type} step.`;
      let status: 'success' | 'error' = 'success';

      if (node.data.type === 'approval') {
        const threshold = node.data.autoApproveThreshold || 1;
        const approved = Math.random() > (threshold / 60); // Mock logic
        message = approved ? 'Request approved.' : 'Request rejected.';
        
        const edgeType = approved ? 'approved' : 'rejected';
        const nextEdges = edges.filter((e: any) => e.source === node.id && e.sourceHandle === edgeType);
        nextEdges.forEach((e: any) => {
          const nextNode = nodes.find((n: any) => n.id === e.target);
          if (nextNode) queue.push(nextNode);
        });
      } else {
        const nextEdges = edges.filter((e: any) => e.source === node.id);
        nextEdges.forEach((e: any) => {
          const nextNode = nodes.find((n: any) => n.id === e.target);
          if (nextNode) queue.push(nextNode);
        });
      }

      steps.push({
        nodeId: node.id,
        nodeType: node.data.type,
        title: node.data.title || node.data.label,
        status,
        message,
        timestamp: new Date().toISOString(),
        duration: stepDuration
      });
    }

    const result: ExecutionResult = {
      success: true,
      totalSteps: steps.length,
      executionTime: totalTime,
      steps,
      errors: []
    };

    return HttpResponse.json(result);
  })
];
