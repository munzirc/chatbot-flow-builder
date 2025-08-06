import React from "react";
import { availableNodes } from "../../../config/availableNodes";
import { CiGrid41 } from "react-icons/ci";

const AvailableNodesList: React.FC = () => {
  const handleDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="relative h-full flex-1 pt-4 bg-[#1a1a1a]">
      <div className="flex flex-col items-center gap-3 p-4 ">
        <div className="bg-[#685000] rounded-full size-12  relative">
          <CiGrid41
            size={24}
            className="text-[#c0c0c0] absolute left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-base text-[#c0c0c0] font-semibold">
            Available Nodes
          </p>
          <p className="text-xs text-[#FDFDFD66] text-center font-semibold">
            Drag and drop nodes to build your <br /> chatbot flow
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 left-0 top-44 px-4 py-3  space-y-3 overflow-y-scroll scrollbar-hide">
        {availableNodes.map((node) => (
          <div
            key={node.type}
            className={`flex cursor-grab select-none p-3 bg-[#1a1a1a]  text-xs rounded-lg 
               border  border-[#323232] hover:ring-2 hover:ring-[#5b4602a3] transition `}
            draggable
            onDragStart={(e) => handleDragStart(e, node.type)}
          >
            <div className="p-2 flex text-[#c0c0c0] items-center h-fit rounded-xl border border-[#323232] bg-[#232323]">
              <node.icon size={24} />
            </div>
            <div className="text-base text-[#c0c0c0] font-semibold ps-2 pb-1 flex items-center">
              <p>{node.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableNodesList;
