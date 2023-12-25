import { deleteDeck, getDeckById, updateDeck } from "@/crud/deck";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  const deck = await getDeckById(Number(params.id));
  return NextResponse.json(deck);
}

export async function PUT(req: NextRequest) {
  const { id, title } = await req.json();
  const res = await updateDeck(id, title);
  return NextResponse.json(res);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const res = await deleteDeck(params.id);
  return NextResponse.json(res);
}
