import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const decks = await getAllProblems();
  return NextResponse.json(decks);
}

export async function POST(request: NextResponse) {
  const { front, back, deckId } = await request.json();

  await prisma.problem.create({
    data: {
      front: front,
      back: back,
      deckId: Number(deckId),
    },
  });

  return NextResponse.json({ msg: "success" }, { status: 201 });
}

const getAllProblems = async () => {
  return await prisma.problem.findMany();
};
