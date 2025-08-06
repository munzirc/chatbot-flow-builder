import React, { useEffect, useState } from "react";
import { useStore, useReactFlow } from "@xyflow/react";
import { TbSettings } from "react-icons/tb";

type NodeData = {
  label: string;
  message: string;
  icon?: React.ReactNode;
};

const NodeProperties: React.FC<{ selectedId: string | null }> = React.memo(
  ({ selectedId }) => {
    const nodes = useStore((state) => state.nodes);
    const { setNodes } = useReactFlow();

    const selectedNode = nodes.find((node) => node.id === selectedId);
    const data = selectedNode?.data as NodeData | undefined;

    const [message, setMessage] = useState(data?.message ?? "");

    useEffect(() => {
      setMessage(data?.message ?? "");
    }, [selectedId, data?.message]);

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMessage = e.target.value;
      setMessage(newMessage);

      if (selectedNode) {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === selectedNode.id
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    message: newMessage,
                  },
                }
              : node
          )
        );
      }
    };

    return (
      <div className="h-1/2">
        <div className="px-4 py-2 bg-[#1f1f1f] border-b border-[#323232] flex items-center gap-2 text-[#c0c0c099]">
          <TbSettings size={18} />
          <p className="text-sm font-semibold">Properties</p>
        </div>
        <div>
          {selectedNode && data ? (
            <div className="p-4 space-y-4">
              <div className="flex flex-col gap-2 text-[#bfbfbf99]">
                <label className="text-xs font-bold">Unique Identifier</label>
                <input
                  value={selectedId ?? ""}
                  disabled
                  className="border border-[#323232] rounded-lg p-2 text-sm font-medium"
                />
              </div>
              <div className="flex flex-col gap-2 text-[#bfbfbf99]">
                <label className="text-xs font-bold">Message</label>
                <input
                  value={data.message}
                  onChange={handleMessageChange}
                  placeholder="Add a message"
                  className="border border-[#323232] rounded-lg p-2 text-sm font-medium outline-none 
             focus:border-[#5b4602] focus:ring-2 focus:ring-[#5b4602a3] 
             hover:bg-[#2a2a2a]"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-10 space-y-4">
              <div className="bg-[#685000] rounded-full size-12  relative">
                <TbSettings
                  size={24}
                  className="text-[#c0c0c0] absolute left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <div className="w-[70%] mx-auto text-center">
                <h2 className="text-base text-[#c0c0c0] font-semibold">
                  Node Properties
                </h2>
                <p className="text-[#FDFDFD66] text-xs font-medium">
                  Here you can view and edit the properties of the selected
                  node.
                </p>
              </div>
              <p className="w-[70%] text-center font-medium text-[#FDFDFD66] text-xs">
                Select a node from the list on the top to view its properties.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default NodeProperties;
