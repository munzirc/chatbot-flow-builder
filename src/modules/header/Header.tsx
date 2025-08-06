import { useStore } from "@xyflow/react";
import { useValidateFlow } from "../../hooks/useValidateFlow";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const Header = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const validateFlow = useValidateFlow(nodes, edges);
  return (
    <div className="relative h-13 border-b border-[#323232] bg-[#1a1a1a] flex items-center">
      <button
        onClick={validateFlow}
        className="absolute right-40 flex items-center gap-2 border border-[#323232] text-sm font-medium text-[#c0c0c0] px-4 py-2 rounded-lg hover:bg-[#2a2a2a]"
      >
        <IoIosCheckmarkCircleOutline className="h-5 w-5" />
        Validate Flow
      </button>
    </div>
  );
};

export default Header;
