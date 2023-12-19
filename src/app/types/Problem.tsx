import { DeckType } from "./Deck";

export type ProblemType = {
  id: number;
  front: string;
  back: string;
  deck: DeckType;
};

export type ProblemInputType = {
  front: string;
  back: string;
  deckId: number;
};
