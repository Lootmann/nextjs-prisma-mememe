import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDecks = async () => {
  return await prisma.deck.findMany();
};

export const getDeckById = async (deckId: number) => {
  return await prisma.deck.findFirst({ where: { id: deckId } });
};

export const createDeck = async (title: string) => {
  return await prisma.deck.create({
    data: {
      title: title,
    },
  });
};
