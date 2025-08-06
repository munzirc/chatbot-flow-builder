import { TbMessageCircle } from "react-icons/tb";
import { NodeType } from "../types/NodeTypes";


export const getDefaultData = (type: NodeType): Record<string, any> => {
  switch (type) {
    case NodeType.TextMessageNode:
      return { label: "Text Message", message: "", icon: TbMessageCircle };
    default:
      return {};
  }
};
