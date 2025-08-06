import React, {
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";
import { availableNodes } from "../../../../config/availableNodes";
import type { NodeType } from "../../../../types/NodeTypes";
import { useReactFlow, type Connection } from "@xyflow/react";

interface Props {
  onNodeSelect: (type: NodeType) => void;
  onCancel: Dispatch<SetStateAction<boolean>>;
  connection: Connection | null;
}

const CycleResolutionModal: React.FC<Props> = ({
  onNodeSelect,
  onCancel,
  connection,
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const { getNode } = useReactFlow();
  const [targetNode, setTargetNode] = useState({ x: 200, y: 200 });

  useEffect(() => {
    if (connection) {
      const node = getNode(connection.target);
      if (node?.position) {
        setTargetNode({ x: node.position.x, y: node.position.y });
      }
    }
  }, [connection, getNode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (backdropRef.current && event.target === backdropRef.current) {
        onCancel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div
      ref={backdropRef}
      className="absolute inset-0 z-40 bg-black/10 backdrop-blur-sm pointer-events-auto"
    >
      <div
        style={{
          transform: `translate(${targetNode.x}px, ${targetNode.y}px) translateY(50%)`,
        }}
        className="absolute bg-[#1e1e1e] text-[#DEE2E6] p-1 rounded-xl shadow-lg space-y-2 w-46 max-w-64 border border-[#323232]"
      >
        {availableNodes.map((node) => (
          <div
            key={node.type}
            onClick={() => onNodeSelect(node.type)}
            className="flex items-center justify-between p-1 rounded-lg cursor-pointer hover:bg-[#2a2a2a] transition"
          >
            <div className="flex items-center gap-2">
              <div className="border border-[#323232] rounded-lg p-1">
                <node.icon size={16} />
              </div>
              <span className="text-sm mb-0.5">{node.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CycleResolutionModal;
