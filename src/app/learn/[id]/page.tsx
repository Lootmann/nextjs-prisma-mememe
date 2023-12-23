/**
 * learn/[id]
 */
"use client";

import { ProblemLearnType } from "@/types/Problem";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const header = `
    w-full flex justify-center px-4 py-1 gap-4
    text-xl
    bg-slate-800
    border rounded-md`;

const statement = `
    text-xl px-4 py-2
    w-full flex flex-col flex-1 grow gap-4
    border rounded-md`;

const footer = `
    w-full flex justify-center px-4 py-1
    bg-slate-800
    border rounded-md`;

export default function Page() {
  const [problem, setProblem] = React.useState<ProblemLearnType | undefined>(
    undefined
  );

  // get url params '/learn/:deckId'
  const params = useParams();

  const [isFlip, setIsFlip] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsFlip(false);

    const fetchProblem = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const resp = await fetch(`/api/problems/${params.id}/random`, options);
      const data = await resp.json();

      if (!resp.ok) {
        return;
      }
      setProblem(data);
    };

    fetchProblem();
  }, [params]);

  return (
    <div className="h-full w-full gap-4 flex flex-col items-center">
      <header className={`${header}`}>
        <button>Edit</button>
        <button>Hoge</button>
      </header>

      {problem == undefined ? (
        <>
          <p className="text-2xl ">No Problem D:</p>
          <p className="text-2xl">Create Problems :^)</p>
          <Link
            href={`/add/`}
            className="border px-2 text-xl bg-neutral-200 text-neutral-900 rounded-md"
          >
            Create New Problem
          </Link>
        </>
      ) : (
        <>
          <div className={`${statement}`} onClick={() => setIsFlip(true)}>
            <p className="text-xl">{problem.front}</p>
            {isFlip && <p className="text-xl">{problem.back}</p>}
          </div>

          <footer className={`${footer}`}>
            <Link href={`/learn/${problem.deckId}`} className="text-xl">
              Next
            </Link>
          </footer>
        </>
      )}
    </div>
  );
}
