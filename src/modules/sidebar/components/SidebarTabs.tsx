import React from "react";
import { BiLayer } from "react-icons/bi";
import { CiGrid41 } from "react-icons/ci";

type TabType = "nodes" | "add";

interface Props {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const SidebarTabs: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-l border-[#323232] h-full bg-[#1f1f1f] flex flex-col p-2 text-[#c0c0c0] space-y-2">
      <button
        onClick={() => setActiveTab("add")}
        className={`p-1 rounded-lg transition cursor-pointer 
          ${
            activeTab === "add"
              ? "ring-1 ring-[#5b4602a3] hover:bg-transparent"
              : "hover:bg-[#333333]"
          } `}
        title="Add Node"
      >
        <CiGrid41 size={20} />
      </button>

      <div className="h-px w-4 bg-[#3a3a3a] mx-auto" />

      <button
        onClick={() => setActiveTab("nodes")}
        className={`p-1 rounded-lg transition cursor-pointer 
          ${
            activeTab === "nodes"
              ? "ring-1 ring-[#5b4602a3] hover:bg-transparent"
              : "hover:bg-[#333333]"
          } `}
        title="Node List"
      >
        <BiLayer size={20} />
      </button>
    </div>
  );
};

export default SidebarTabs;
