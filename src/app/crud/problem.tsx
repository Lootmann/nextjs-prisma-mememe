import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProblems = async () => {
  return await prisma.problem.findMany();
};

export const getProblemById = async (problemId: string) => {
  return await prisma.problem.findFirst({ where: { id: Number(problemId) } });
};

const randomIdx = (length: number) => {
  return Math.floor(Math.random() * length);
};

export const getRandomProblemByDeck = async (deckId: string) => {
  const deck = await prisma.deck.findFirst({
    where: { id: Number(deckId) },
    select: { problems: true },
  });

  if (deck) {
    const idx = randomIdx(deck.problems.length);
    return deck.problems[idx];
  } else {
    return {};
  }
};

export const putProblem = async (id: string, front: string, back: string) => {
  return await prisma.problem.update({
    where: { id: Number(id) },
    data: {
      front: front,
      back: back,
    },
  });
};
