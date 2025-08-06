import React, { useCallback, type MouseEvent } from "react";
import { TbSettings } from "react-icons/tb";
import { useFlowStore } from "../../../../store/useFlowStore";

interface Props {
  nodeId: string;
}

const SettingsButton: React.FC<Props> = ({ nodeId }) => {
  const setActiveTab = useFlowStore((state) => state.setActiveTab);
  const setSelectedId = useFlowStore((state) => state.setSelectedId);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      setSelectedId(nodeId);
      setActiveTab("nodes");
    },
    [setActiveTab, setSelectedId]
  );

  return (
    <button
      title="Settings"
      className="p-1 rounded-md active:bg-[#232323] hover:bg-[#3e3e3e] transition cursor-pointer"
      onClick={handleClick}
    >
      <TbSettings size={14} className="text-[#c0c0c0]" />
    </button>
  );
};

export default SettingsButton;
