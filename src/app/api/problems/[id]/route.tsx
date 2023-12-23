/**
 * api/problems/[id]
 */
import { getProblemById, putProblem } from "@/crud/problem";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const deck = await getProblemById(params.id);

  return NextResponse.json(deck);
}

export async function PUT(req: NextRequest) {
  const { id, front, back } = await req.json();
  const updated = await putProblem(id, front, back);

  return NextResponse.json(updated);
}
