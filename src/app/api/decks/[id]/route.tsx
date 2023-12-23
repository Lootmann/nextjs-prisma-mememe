import { getDeckById, updateDeck } from "@/crud/deck";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const deck = await getDeckById(Number(params.id));
  return NextResponse.json(deck);
}

export async function PUT(req: NextRequest) {
  const { id, title } = await req.json();
  const res = await updateDeck(id, title);
  return NextResponse.json(res);
}
