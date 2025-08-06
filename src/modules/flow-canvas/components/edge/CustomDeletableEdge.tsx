import type { EdgeProps } from "@xyflow/react";
import {
  BaseEdge,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";
import { AiOutlineClose } from "react-icons/ai";

const CustomDeletableEdge = (props: EdgeProps) => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
  } = props;

  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleDelete = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} />

      <foreignObject
        width={20}
        height={20}
        x={labelX - 10}
        y={labelY - 10}
        requiredExtensions="http://www.w3.org/1999/xhtml"
        className="pointer-events-auto"
      >
        <div className="w-full h-full flex items-center justify-center">
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Delete edge"
            className="size-5 flex items-center justify-center rounded-full 
              bg-transparent text-red-400 hover:bg-[#2a2a2a] transition-all duration-200"
          >
            <AiOutlineClose size={10} />
          </button>
        </div>
      </foreignObject>
    </>
  );
}

export default CustomDeletableEdge;
