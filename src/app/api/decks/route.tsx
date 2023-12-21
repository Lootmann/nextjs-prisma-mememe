import { createDeck, getDecks } from "@/app/crud/deck";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const decks = await getDecks();
  return NextResponse.json(decks);
}

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  await createDeck(title);
  const decks = await getDecks();
  return NextResponse.json(decks);
}
