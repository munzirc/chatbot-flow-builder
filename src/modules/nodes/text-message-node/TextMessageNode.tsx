import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { TbMessageCircle } from "react-icons/tb";
import DeleteButton from "./components/DeleteButton";
import SettingsButton from "./components/SettingsButton";
import { useFlowStore } from "../../../store/useFlowStore";

type TextMessageNode = Node<{ message: string }, "textMessageNode">;

const TextMessageNode = ({
  id,
  data,
}: NodeProps<TextMessageNode>) => {

  const selectedId = useFlowStore((state) => state.selectedId);
  const setSelectedId = useFlowStore((state) => state.setSelectedId);

  return (
    <div
      onClick={() => setSelectedId(id)}
      className={`max-w-[300px] rounded-xl border  ${
        selectedId === id
          ? "ring-2 ring-[#5b4602a3] border-[#5b4602]"
          : "border-[#323232]"
      }`}
    >
      <div className="flex items-center justify-between py-1 px-2 rounded-t-xl bg-[#232323] border-b border-b-[#323232]">
        <div className="flex items-center ps-1 text-[#c0c0c0] gap-2 font-bold">
          <TbMessageCircle size={16} />
          <p className="text-xs mb-0.5 ">TEXT MESSAGE</p>
        </div>
        <div className="flex items-center gap-1">
          <SettingsButton nodeId={id}/>
          <DeleteButton nodeId={id} />
        </div>
      </div>
      <div className="p-3 bg-[#1a1a1a]">
        <p className="text-xs text-[#c0c0c099] font-bold">Message content</p>
        {data.message === "" ? (
          <p className="text-sm text-[#c0c0c099] font-semibold italic">Add a message...</p>
        ) : (
          <p className="text-[#c0c0c0] text-sm font-semibold break-words whitespace-pre-wrap line-clamp-4">
            {data.message}
          </p>
        )}
      </div>
      <div className="flex items-center text-xs rounded-b-xl text-[#c0c0c099] font-semibold  px-2 py-1  bg-[#232323] border-t border-t-[#323232]">
        Node: {id}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="handle-ring-target"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="handle-ring-source"
      />
    </div>
  );
};

export default TextMessageNode;
