import { prisma } from "../lib/prisma";

export const getDecks = async () => {
  return await prisma.deck.findMany();
};

export const getDeckById = async (deckId: number) => {
  return await prisma.deck.findFirst({
    where: { id: deckId },
    include: { problems: true },
  });
};

export const createDeck = async (title: string) => {
  return await prisma.deck.create({
    data: {
      title: title,
    },
  });
};

export const updateDeck = async (deckId: string, title: string) => {
  return await prisma.deck.update({
    where: {
      id: Number(deckId),
    },
    data: {
      title: title,
    },
  });
};

export const deleteDeck = async (deckId: string) => {
  return await prisma.deck.delete({
    where: { id: Number(deckId) },
  });
};
