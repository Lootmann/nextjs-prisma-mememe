import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const decks = await getAllDecks();
  return NextResponse.json(decks);
}

export async function POST(request: NextResponse) {
  const { statement, answer } = await request.json();

  await prisma.decks.create({
    data: {
      statement: statement,
      answer: answer,
    },
  });

  const decks = await getAllDecks();
  return NextResponse.json(decks);
}

const getAllDecks = async () => {
  return await prisma.decks.findMany();
};