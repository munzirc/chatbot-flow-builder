import {
  addEdge,
  Background,
  BackgroundVariant,
  type Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type NodeChange,
} from "@xyflow/react";
import TextMessageNode from "../nodes/text-message-node/TextMessageNode";
import CustomControls from "./components/controls/CustomControl";
import { useCallback, useRef, useState } from "react";
import { NodeType } from "../../types/NodeTypes";
import { useAddNode } from "../../hooks/useAddNode";
import CustomDeletableEdge from "./components/edge/CustomDeletableEdge";
import { useCycleDetection } from "../../hooks/useCycleDetection";
import CycleResolutionModal from "./components/modals/CycleResolutionModal";

const nodeTypes = {
  [NodeType.TextMessageNode]: TextMessageNode,
};
const edgeTypes = {
  removable: CustomDeletableEdge,
};

const FlowCanvas = () => {
  const [nodes, _, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { addNodeOnDrag, addNodeOnClick } = useAddNode();
  const [showModal, setShowModal] = useState(false);
  const currConnection = useRef<Connection | null>(null);
  const { willCreateCycle } = useCycleDetection();

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;

    addNodeOnDrag(type as NodeType, event);
  };

  const onNodeselect = (type: NodeType) => {
    if (!type) return;

    addNodeOnClick(type as NodeType, currConnection.current);
    setShowModal(false);
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      const { source, target } = connection;
      if (connection.source === connection.target) return;
      if (willCreateCycle(source, target)) {
        currConnection.current = connection;
        setShowModal(true);
      } else {
        setEdges((eds: Edge[]) =>
          addEdge({ ...connection, type: "removable" }, eds)
        );
      }
    },
    [setEdges]
  );

  const handleNodeChange = (nodes: NodeChange<Node>[]) => {

    onNodesChange(nodes);
  }

  return (
    <div className="min-h-full flex-3 relative">
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodeChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid={true}
        snapGrid={[16, 16]}
        minZoom={0.75}
        maxZoom={3}
        colorMode="dark"
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background variant={BackgroundVariant.Dots} size={0.5} />
        <CustomControls />
      </ReactFlow>

      {showModal && (
        
          <CycleResolutionModal
            onNodeSelect={onNodeselect}
            onCancel={setShowModal}
            connection={currConnection.current}
          />
      )}
    </div>
  );
};

export default FlowCanvas;
