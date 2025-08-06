import React, { useEffect } from "react";
import { useStore, type Node } from "@xyflow/react";
import { useFlowStore } from "../../../store/useFlowStore";
import type { IconType } from "react-icons";
import NodesInFlowList from "../components/NodesInFlowList";
import NodeProperties from "../components/NodeProperties";

type NodeData = {
  label?: string;
  message?: string;
  icon?: IconType;
};

export type NodeType = Node<NodeData>;

const NodesInFlow: React.FC = () => {
  const nodes = useStore((s) => s.nodes) as NodeType[];
  const selectedId = useFlowStore((state) => state.selectedId);
  const setSelectedId = useFlowStore((state) => state.setSelectedId);

  return (
    <div className="h-full flex-1 bg-[#1a1a1a]">
      <NodesInFlowList {...{ nodes, selectedId, setSelectedId }} />
      <NodeProperties {...{selectedId}}/>
    </div>
  );
};

export default NodesInFlow;
