import React from "react";
import { BiLayer } from "react-icons/bi";
import type { NodeType } from "../tabs/NodesInFlow";

interface Props {
  nodes: NodeType[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

const NodesInFlowList: React.FC<Props> = ({
  nodes,
  selectedId,
  setSelectedId,
}) => {
  return (
    <div className="h-1/2">
      <div className="px-4 py-2 bg-[#1f1f1f] border-b border-[#323232] flex items-center gap-2 text-[#c0c0c099]">
        <BiLayer size={16} />
        <p className="text-sm font-semibold">Nodes in Flow</p>
      </div>

      <div className="p-2 space-y-2">
        {nodes.map((node) => (
          <button
            key={node.id}
            className={`w-full px-3 py-1 rounded-lg text-sm text-[#c0c0c0] hover:bg-[#232323] 
                  ${selectedId === node.id ? "ring ring-[#5b4602a3]" : ""}`}
            onClick={() => setSelectedId(node.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {node.data.icon && (
                  <node.data.icon size={18} className="inline-block" />
                )}
                <div className="uppercase text-xs">{node.data.label}</div>
              </div>
              <div className="text-xs w-[35%] p-1 rounded text-[#c0c0c099] bg-[#1f1f1f] line-clamp-1">
                {node.id}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NodesInFlowList;
