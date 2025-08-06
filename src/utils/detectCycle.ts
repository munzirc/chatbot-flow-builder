import type { Node, Edge } from '@xyflow/react';


export function hasCycle(nodes: Node[], edges: Edge[]): boolean {
  const graph = new Map<string, string[]>();

  nodes.forEach((node) => {
    graph.set(node.id, []);
  });

  edges.forEach((edge) => {
    if (graph.has(edge.source)) {
      graph.get(edge.source)!.push(edge.target);
    }
  });

  const visited = new Set<string>();
  const recStack = new Set<string>();

  const dfs = (nodeId: string): boolean => {
    if (!visited.has(nodeId)) {
      visited.add(nodeId);
      recStack.add(nodeId);

      for (const neighbor of graph.get(nodeId) ?? []) {
        if (!visited.has(neighbor) && dfs(neighbor)) return true;
        if (recStack.has(neighbor)) return true;
      }
    }

    recStack.delete(nodeId);
    return false;
  };

  // Run DFS from each node
  for (const node of nodes) {
    if (dfs(node.id)) return true;
  }

  return false;
}
