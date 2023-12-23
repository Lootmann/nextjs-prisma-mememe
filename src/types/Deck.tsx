import { ProblemType } from "./Problem";

export type DeckBase = {
  title: string;
};

export type DeckType = DeckBase & {
  id: number;
  problems: ProblemType[];
};

export type DeckCreateType = DeckBase & {};

export type DeckUpdateType = DeckBase & {
  id: number;
};
