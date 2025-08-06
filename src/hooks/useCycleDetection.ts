import { useReactFlow } from '@xyflow/react';
import { hasCycle } from '../utils/detectCycle';
import { v4 as uuid } from 'uuid';

export function useCycleDetection() {
  const { getNodes, getEdges } = useReactFlow();

  const willCreateCycle = (sourceId: string, targetId: string): boolean => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    const newEdge = {
      id: uuid(),
      source: sourceId,
      target: targetId,
    };

    const nextEdges = [...currentEdges, newEdge];

    return hasCycle(currentNodes, nextEdges);
  };

  return { willCreateCycle };
}
