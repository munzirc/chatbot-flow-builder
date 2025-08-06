import React from "react";
import SidebarTabs from "./components/SidebarTabs";
import AvailableNodesList from "./tabs/AvailableNodesList";
import NodesInFlow from "./tabs/NodesInFlow";
import { useFlowStore } from "../../store/useFlowStore";


const Sidebar: React.FC = () => {
  const activeTab = useFlowStore((state) => state.activeTab);
  const setActiveTab = useFlowStore((state) => state.setActiveTab);

  return (
    <div className="flex-1 relative border-l border-[#323232]  min-h-full flex">
      {activeTab === "add" ? <AvailableNodesList /> : <NodesInFlow />}

      <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Sidebar;
