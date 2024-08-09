type PartType = "head" | "tail";
type Color = string;

export type Edge = {
  type: PartType;
  color: Color;
};

export type Piece = [Edge, Edge, Edge, Edge];

export type Board = (Piece | null)[][];
