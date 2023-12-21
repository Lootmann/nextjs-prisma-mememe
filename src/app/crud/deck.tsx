import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDecks = async () => {
  return await prisma.deck.findMany();
};

export const getDeckById = async (deckId: number) => {
  return await prisma.deck.findFirst({ where: { id: deckId } });
};
