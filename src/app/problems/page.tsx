/**
 * problems/
 *
 * 1. left  side: most youngest id problem
 *    right side: all problesm
 *
 * 2. when search problem...
 *    2-1. when found some problems,
 *         show most youngest id problem
 *         and show all found problems to right column
 *    2-2. left side will be empty
 *         and <p>No Problems<p> message to right column
 */
"use client";

import React from "react";
import { ProblemSearchType, ProblemType } from "../../types/Problem";
import { UpdateProblem } from "@/components/problems/UpdateProblem";
import { SubmitHandler, useForm } from "react-hook-form";
import { truncate } from "../util/utils";

const right = `
  text-base
  h-full w-full flex flex-col`;

const table_row = `border text-center`;
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

  const getAllProblems = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const resp = await fetch("/api/problems", options);
    return await resp.json();
  };

  React.useEffect(() => {
    const fetchProblems = async () => {
      const data = await getAllProblems();
      console.log(data);

      // set default problem to left textarea
      if (problem.id == 0) {
        setProblem(data[0]);
      } else {
        setProblem(data[problem.id - 1]);
      }

      // set all problems right columns
      setProblems(data);
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

  // search form
  const { register, handleSubmit } = useForm<ProblemSearchType>();

  const handleSearchform: SubmitHandler<ProblemSearchType> = async (data) => {
    console.log("handleSearchForm", data);

    // when empty input, show all problems
    if (data.input == "") {
      const d = await getAllProblems();
      setProblems(d);
      setProblem(d[0]);
      return;
    }

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `/api/problems/search/?input=${data.input}`,
      options
    );

    const fetched: ProblemType[] = await res.json();

    // no problems
    if (fetched.length == undefined) {
      setProblems([]);
      setProblem({ id: 0, front: "D;", back: "D;" });
      return;
    }

    // found some problems
    setProblems(fetched);
    setProblem(fetched[0]);
  };

  return (
    <div className="h-full w-full flex  gap-4 items-center">
      <UpdateProblem
        id={problem.id}
        front={problem.front}
        back={problem.back}
        handleRefresh={() => setRefresh(!refresh)}
      />

      <div className={`${right}`}>
        <header className="mb-4">
          <form onSubmit={handleSubmit(handleSearchform)}>
            <input
              type="text"
              placeholder="search"
              {...register("input")}
              className="w-full text-xl px-2 bg-neutral-700 text-neutral-100 rounded-md"
            />
          </form>
        </header>

        {problems.length == 0 ? (
          <p>No Problems :^)</p>
        ) : (
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className={`${table_row} w-16`}>id</th>
                <th className={`${table_row}`}>Front</th>
                <th className={`${table_row}`}>Back</th>
              </tr>
            </thead>

            <tbody>
              {problems.map((prob) => (
                <tr
                  key={prob.id}
                  className={hover_row}
                  onClick={() => handleClick(prob.id)}
                >
                  <td className={`${table_row}`}>{prob.id}</td>
                  <td className={`${table_row}`}>{truncate(prob.front)}</td>
                  <td className={`${table_row}`}>{truncate(prob.back)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
