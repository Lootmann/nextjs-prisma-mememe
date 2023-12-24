import React from "react";
import { ProblemUpdateType } from "@/types/Problem";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  id: number;
  front: string;
  back: string;
  handleRefresh: () => void;
};

const wrapper = `
  h-full w-full flex flex-col gap-4`;

const textarea = `
  p-2
  grow
  bg-neutral-950 text-neutral-200 rounded-md`;

export function UpdateProblem(props: Props) {
  const { register, handleSubmit, reset } = useForm<ProblemUpdateType>();

  React.useEffect(() => {
    reset({ id: props.id, front: props.front, back: props.back });
  }, [props]);

  const onSubmit: SubmitHandler<ProblemUpdateType> = async (data) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
        front: data.front,
        back: data.back,
      }),
    };

    const resp = await fetch(`/api/problems/${props.id}`, options);

    if (!resp.ok) {
      console.log(resp);
      return;
    }

    const res = await resp.json();
    props.handleRefresh();
  };

  return (
    <form className={wrapper} onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...register("front")}
        defaultValue={props.front}
        className={textarea}
      />
      <textarea
        {...register("back")}
        defaultValue={props.back}
        className={textarea}
      />
      <footer className="flex justify-center">
        <input
          type="submit"
          value="Update"
          className="border px-2 rounded-md"
        />
      </footer>
    </form>
  );
}
