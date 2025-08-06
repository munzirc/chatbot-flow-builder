
import { toast } from "react-hot-toast";
import type { Node, Edge } from "@xyflow/react";
import { useCallback } from "react";

export function useValidateFlow(nodes: Node[], edges: Edge[]) {
  return useCallback(() => {
    if (!nodes.length) {
      toast.error("No nodes in the flow.");
      return false;
    }

    const connectedNodeIds = new Set<string>();
    edges.forEach(edge => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    const disconnectedNodes = nodes.filter(node => !connectedNodeIds.has(node.id));

    if (disconnectedNodes.length > 0) {
      toast.error("Some nodes are not connected.");
      return false;
    }

    toast.success("Flow is valid!");
    return true;
  }, [nodes, edges]);
}
