import { createProblem, getProblems } from "@/crud/problem";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const decks = await getProblems();

  return NextResponse.json(decks);
}

export async function POST(req: NextRequest) {
  // get params from POST body
  const { front, back, deckId } = await req.json();
  await createProblem(front, back, deckId);

  return NextResponse.json({ msg: "success" }, { status: 201 });
}
