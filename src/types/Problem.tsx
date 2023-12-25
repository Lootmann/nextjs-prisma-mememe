import { DeckType } from "./Deck";

export type ProblemBase = {
  front: string;
  back: string;
};

export type ProblemType = ProblemBase & {
  id: number;
  deck: DeckType;
};

export type ProblemInputType = ProblemBase & {
  deckId: number;
};

export type ProblemUpdateType = ProblemBase & {
  id: number;
};

export type ProblemLearnType = ProblemBase & {
  id: number;
  deckId: number;
};

export type ProblemSearchType = {
  input: string;
};
