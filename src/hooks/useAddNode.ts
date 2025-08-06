import {
  addEdge,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";
import { getDefaultData } from "../utils/getDefaultData";
import type { NodeType } from "../types/NodeTypes";

export const useAddNode = () => {
  const { setNodes, setEdges, screenToFlowPosition } = useReactFlow();

  const addNodeOnDrag = (type: NodeType, event: React.DragEvent) => {
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode: Node = {
      id: uuidv4(),
      type,
      position,
      data: getDefaultData(type),
    };

    setNodes((prev: Node[]) => [...prev, newNode]);
  };

  const addNodeOnClick = (type: NodeType, connection: Connection | null) => {
    const position = { x: Math.random() * 300, y: Math.random() * 300 };

    const newNode: Node = {
      id: uuidv4(),
      type,
      position,
      data: getDefaultData(type),
    };

    setNodes((prev: Node[]) => [...prev, newNode]);

    setEdges((prev: Edge[]) => {
      if (connection) {
        return addEdge(
          {
            id: uuidv4(),
            source: connection.source,
            target: newNode.id,
            type: "removable",
          },
          prev
        );
      }
      return prev;
    });
  };

  return { addNodeOnDrag, addNodeOnClick };
};
