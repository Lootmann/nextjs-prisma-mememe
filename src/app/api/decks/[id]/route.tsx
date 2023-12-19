import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const deck = await getDeckById(Number(params.id));
  return NextResponse.json(deck);
}

const getDeckById = async (deckId: number) => {
  return await prisma.decks.findFirst({ where: { id: deckId } });
};
