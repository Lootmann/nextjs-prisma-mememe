/**
 * api/problems/[id]/random
 */
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const deck = await getRandomProblemByDeck(Number(params.id));
  return NextResponse.json(deck);
}

const randomIdx = (length: number) => {
  return Math.floor(Math.random() * length);
};

const getRandomProblemByDeck = async (deckId: number) => {
  const deck = await prisma.deck.findFirst({
    where: { id: deckId },
    select: { problems: true },
  });

  if (deck) {
    const idx = randomIdx(deck.problems.length);
    return deck.problems[idx];
  } else {
    return {};
  }
};
