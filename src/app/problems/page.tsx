/**
 * problems/
 */
"use client";

import React from "react";
import { ProblemType } from "../types/Problem";
import Link from "next/link";

const left = `
  h-full w-full flex flex-col gap-4`;
const right = `
  text-base
  h-full w-full flex flex-col`;

const table_row = `p-1 border text-center`;
const hover_row = `hover:bg-sky-800`;
const link = `px-1 bg-red-400 hover:bg-red-600 text-slate-900 rounded-md`;

type PType = {
  id: number;
  front: string;
  back: string;
};

export default function Page() {
  const [problems, setProblems] = React.useState<ProblemType[]>([]);
  const [problem, setProblem] = React.useState<PType>({
    id: 0,
    front: ":^)",
    back: ":^)",
  });

  React.useEffect(() => {
    const fetchProblems = async () => {
      const options = {
        method: "GET",
        "Content-Type": "application/json",
      };

      const resp = await fetch("/api/problems", options);
      const data = await resp.json();

      if (!resp.ok) {
        console.log(data);
      }

      setProblems(data);
    };

    fetchProblems();
  }, []);

  const handleClick = (problemId: number) => {
    const fetchProblem = async () => {
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const resp = await fetch(`/api/problems/${problemId}`, options);
      const data = await resp.json();

      if (!resp.ok) {
        setProblem({ id: 0, front: ":^)", back: ":^)" });
        return;
      }
      setProblem(data);
    };

    fetchProblem();
  };

  return (
    <div className="h-full w-full flex  gap-4 items-center">
      <div className={`${left}`}>
        <p className="border p-2 grow">{problem.front}</p>
        <p className="border p-2 grow">{problem.back}</p>
      </div>

      <div className={`${right}`}>
        <table className="table-auto">
          <thead className={table_row}>
            <tr>
              <th className={table_row}>id</th>
              <th className={table_row}>Front</th>
              <th className={table_row}>Back</th>
              <th className={table_row}>Deck</th>
            </tr>
          </thead>

          <tbody>
            {problems.map((prob) => (
              <tr
                key={prob.id}
                className={hover_row}
                onClick={() => handleClick(prob.id)}
              >
                <td className={table_row}>{prob.id}</td>
                <td className={table_row}>{prob.front}</td>
                <td className={table_row}>{prob.back}</td>
                <td className={table_row}>
                  <Link href={`problems/${prob.id}`} className={`${link}`}>
                    edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
