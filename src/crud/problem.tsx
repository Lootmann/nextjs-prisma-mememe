import { prisma } from "../lib/prisma";

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

export const createProblem = async (
  front: string,
  back: string,
  deckId: string
) => {
  return await prisma.problem.create({
    data: {
      front: front,
      back: back,
      deckId: Number(deckId),
    },
  });
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
