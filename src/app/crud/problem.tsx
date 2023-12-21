import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProblems = async () => {
  return await prisma.problem.findMany();
};

export const getProblemById = async (problemId: string) => {
  return await prisma.problem.findFirst({ where: { id: Number(problemId) } });
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
