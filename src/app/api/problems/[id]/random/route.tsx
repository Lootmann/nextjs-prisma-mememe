/**
 * api/problems/[id]/random
 */
import { getRandomProblemByDeck } from "@/crud/problem";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  const deck = await getRandomProblemByDeck(params.id);
  return NextResponse.json(deck);
}
