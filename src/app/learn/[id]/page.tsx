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
  const [problem, setProblem] = React.useState<ProblemLearnType>({
    id: 0,
    front: "",
    back: "",
    deckId: 0,
  });

  // get url params '/learn/:deckId'
  const params = useParams();

  const [isFlip, setIsFlip] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsFlip(false);

    const fetchProblem = async () => {
      const options = {
        method: "GET",
        "Content-Type": "application/json",
      };

      const resp = await fetch(`/api/problems/${params.id}/random`, options);

      if (!resp.ok) {
        // fixme: validation error
      }

      const data = await resp.json();
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

      <div className={`${statement}`} onClick={() => setIsFlip(true)}>
        {problem && (
          <>
            <p className="text-xl">{problem.front}</p>
            {isFlip && (
              <>
                <p className="text-xl">{problem.back}</p>
              </>
            )}
          </>
        )}
      </div>

      <footer className={`${footer}`}>
        <Link href={`/learn/${problem.deckId}`}>Next</Link>
      </footer>
    </div>
  );
}
