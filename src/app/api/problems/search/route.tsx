import { findProblem } from "@/crud/problem";
import { ProblemType } from "@/types/Problem";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get("input");

  if (!input || input == "") {
    return NextResponse.json({});
  }

  const res = await findProblem(input);

  if (res.length == 0) {
    return NextResponse.json({});
  } else {
    return NextResponse.json(res);
  }
}
