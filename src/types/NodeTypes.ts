export const NodeType = {
  StartNode: 'startNode',
  EndNode: 'endNode',
  TextMessageNode: 'textMessageNode',
} as const;

export type NodeType = (typeof NodeType)[keyof typeof NodeType];
