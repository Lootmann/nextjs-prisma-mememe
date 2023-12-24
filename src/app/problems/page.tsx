/**
 * problems/
 */
"use client";

import React from "react";
import { ProblemType } from "../../types/Problem";
import { UpdateProblem } from "@/components/problems/UpdateProblem";

const right = `
  text-base
  h-full w-full flex flex-col`;

const table_row = `p-1 border text-center`;
const hover_row = `hover:bg-sky-800`;

type PType = {
  id: number;
  front: string;
  back: string;
};

export default function Page() {
  const [problems, setProblems] = React.useState<ProblemType[]>([]);
  const [problem, setProblem] = React.useState<PType>({
    id: 0,
    front: "",
    back: "",
  });
  const [refresh, setRefresh] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchProblems = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const resp = await fetch("/api/problems", options);
      const data = await resp.json();

      if (!resp.ok) {
        console.log(data);
      }

      setProblems(data);

      if (problem.id == 0) {
        setProblem(data[0]);
      } else {
        setProblem(data[problem.id - 1]);
      }
    };

    fetchProblems();
  }, [refresh]);

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

  // fixme: when update problem, refresh right column(problems table)
  return (
    <div className="h-full w-full flex  gap-4 items-center">
      <UpdateProblem
        id={problem.id}
        front={problem.front}
        back={problem.back}
        handleRefresh={() => setRefresh(!refresh)}
      />

      <div className={`${right}`}>
        <table className="table-auto">
          <thead className={table_row}>
            <tr>
              <th className={table_row}>id</th>
              <th className={table_row}>Front</th>
              <th className={table_row}>Back</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
