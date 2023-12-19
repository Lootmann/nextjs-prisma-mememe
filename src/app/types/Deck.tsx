import { ProblemType } from "./Problem";

export type DeckType = {
  id: number;
  title: string;
  problems: ProblemType[];
};
