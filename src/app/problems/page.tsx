/**
 * problems/
 */
"use client";

import React from "react";
import { ProblemType } from "../types/Problem";
import Link from "next/link";

const table_row = `px-2 py-1 border text-center`;
const hover_row = `hover:bg-sky-800`;
const link = `px-1 bg-red-400 hover:bg-red-600 text-slate-900 rounded-md`;

export default function Page() {
  const [problems, setProblms] = React.useState<ProblemType[]>([]);

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

      setProblms(data);
    };

    fetchProblems();
  }, []);

  return (
    <div className="h-full w-full flex flex-col gap-4 items-center">
      <h1 className="mb-4">Problems</h1>

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
            <tr key={prob.id} className={hover_row}>
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
  );
}
