import { useCallback, type MouseEvent } from 'react';
import { useReactFlow } from '@xyflow/react';
import { AiOutlineDelete } from 'react-icons/ai';

interface Props {
  nodeId: string;
}

const DeleteButton: React.FC<Props> = ({ nodeId }) => {

  const { setNodes } = useReactFlow();

  const handleDelete = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    },
    [setNodes, nodeId]
  );

  return (
    <button
      title="Delete"
      className="p-1 cursor-pointer rounded-md active:bg-[#242424] hover:bg-[#3e3e3e] transition"
      onClick={handleDelete}
    >
      <AiOutlineDelete size={14} className="text-red-400" />
    </button>
  );
};

export default DeleteButton;
