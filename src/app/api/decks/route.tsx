import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const decks = await getAllDecks();
  return NextResponse.json(decks);
}

export async function POST(request: NextResponse) {
  const { title } = await request.json();

  await prisma.deck.create({
    data: {
      title: title,
    },
  });

  const decks = await getAllDecks();
  return NextResponse.json(decks);
}

const getAllDecks = async () => {
  return await prisma.deck.findMany();
};
