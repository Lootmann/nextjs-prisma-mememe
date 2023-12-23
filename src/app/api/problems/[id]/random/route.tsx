/**
 * api/problems/[id]/random
 */
import { getRandomProblemByDeck } from "@/crud/problem";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const deck = await getRandomProblemByDeck(params.id);
  return NextResponse.json(deck);
}
