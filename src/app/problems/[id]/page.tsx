"use client";

import { ProblemUpdateType } from "@/types/Problem";
import { useParams } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const header_button = `
    px-2 border rounded-md
    outline-none
    hover:bg-neutral-200 hover:text-neutral-900 hover:border-neutral-200
    focus:bg-blue-300 focus:text-neutral-900 focus:border-blue-300
    duration-200`;

const form = `
    h-full w-full
    flex flex-col gap-4`;

const textarea = `
    p-2
    grow flex-1
    text-neutral-100
    bg-neutral-900
    border-none rounded-md outline-none
    hover:bg-neutral-700 focus:bg-neutral-800 duration-100`;

export default function Page() {
  const params = useParams() as { id: string };
  const [problem, setProblem] = React.useState<ProblemUpdateType>();
  const { register, handleSubmit } = useForm<ProblemUpdateType>();

  const onSubmit: SubmitHandler<ProblemUpdateType> = async (data) => {
    const options = {
      method: "PUT",
      body: JSON.stringify({
        id: params.id,
        front: data.front,
        back: data.back,
      }),
    };

    const resp = await fetch(`/api/problems/${params.id}`, options);
    const res = await resp.json();
  };

  React.useEffect(() => {
    const fetchProblem = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const resp = await fetch(`/api/problems/${params.id}`, options);
      const data = await resp.json();

      if (!resp.ok) {
        console.log(data);
      }

      setProblem(data);
    };

    fetchProblem();
  }, [params]);

  return (
    <div className="h-full w-full flex flex-col gap-4">
      {problem && (
        <form className={`${form}`} onSubmit={handleSubmit(onSubmit)}>
          <header className="px-4 flex gap-4 justify-center">
            <button className={`${header_button}`}>Update</button>
            <button className={`${header_button}`}>Hoge</button>
          </header>

          <textarea
            {...register("front")}
            defaultValue={`${problem.front}`}
            className={`${textarea}`}
          ></textarea>
          <textarea
            {...register("back")}
            defaultValue={`${problem.back}`}
            className={`${textarea}`}
          ></textarea>
        </form>
      )}
    </div>
  );
}
