// components/CustomControls.tsx
import React from 'react';
import { useReactFlow, useStore } from '@xyflow/react';
import { FiMaximize, FiMinus, FiPlus } from 'react-icons/fi';

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 3;

const CustomControls: React.FC = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const zoom = useStore((state) => state.transform[2]);

  const isZoomInDisabled = zoom >= MAX_ZOOM;
  const isZoomOutDisabled = zoom <= MIN_ZOOM;

  const baseButton =
    'text-[#c0c0c0] p-1 rounded transition hover:bg-[#2b2b2b] disabled:text-gray-500 disabled:hover:bg-transparent cursor-pointer';

  return (
    <div className="absolute bottom-6 left-6 z-50 flex flex-col p-2 space-y-2 bg-[#1f1f1f] border border-[#3a3a3a] rounded-lg">
      <button
        onClick={() => zoomIn({ duration: 500 })}
        title="Zoom In"
        disabled={isZoomInDisabled}
        className={baseButton}
      >
        <FiPlus size={16} />
      </button>

      <button
        onClick={() => zoomOut({ duration: 500 })}
        title="Zoom Out"
        disabled={isZoomOutDisabled}
        className={baseButton}
      >
        <FiMinus size={16} />
      </button>

      <button
        onClick={() => fitView({ duration: 800 })}
        title="Fit View"
        className={baseButton}
      >
        <FiMaximize size={16} />
      </button>
    </div>
  );
};

export default CustomControls;
