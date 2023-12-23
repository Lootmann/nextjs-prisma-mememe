/**
 * api/problems/[id]
 */
import { deleteProblem, getProblemById, updateProblem } from "@/crud/problem";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  const deck = await getProblemById(params.id);

  return NextResponse.json(deck);
}

export async function PUT(req: NextRequest) {
  const { id, front, back } = await req.json();
  const updated = await updateProblem(id, front, back);

  return NextResponse.json(updated);
}

export async function DEL(req: NextRequest, { params }: Params) {
  const del = await deleteProblem(params.id);

  return NextResponse.json(del);
}
