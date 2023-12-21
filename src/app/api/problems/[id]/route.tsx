/**
 * api/problems/[id]
 */
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const deck = await getProblemById(Number(params.id));

  return NextResponse.json(deck);
}

const getProblemById = async (problemId: number) => {
  return await prisma.problem.findFirst({ where: { id: problemId } });
};
