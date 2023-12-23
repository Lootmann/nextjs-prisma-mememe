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

  if (deck == undefined) {
    return NextResponse.json(
      { message: "deck has no problems" },
      { status: 404 }
    );
  }

  return NextResponse.json(deck);
}
