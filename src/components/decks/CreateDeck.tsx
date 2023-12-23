// note: popup Create Deck Component

import { DeckCreateType, DeckType } from "@/types/Deck";
import { SubmitHandler, useForm } from "react-hook-form";

/**
 * if you click outside the form, remove entire form.
 */
type Props = {
  handleShowCreateDeck: () => void;
  toggleRefresh: () => void;
};

export function CreateDeck(props: Props) {
  // fixme: add animation
  const wrapper = `
    h-full w-full absolute top-0 left-0 z-10
    flex justify-center
    bg-zinc-800 bg-opacity-60`;

  const form = `
    h-44 px-2 mx-auto mt-10
    flex flex-col gap-4 justify-center items-center
    bg-slate-700
    border border-slate-400 rounded-md`;

  const input = `
    px-2
    text-xl
    text-neutral-900
    rounded-md`;

  const { register, handleSubmit } = useForm<DeckCreateType>();

  // fixme: create new Deck
  const onSubmit: SubmitHandler<DeckCreateType> = async (data) => {
    console.log(data);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: data.title }),
    };
    const resp = await fetch("/api/decks", options);

    if (!resp.ok) {
      console.log(resp);
    }

    props.toggleRefresh();
    props.handleShowCreateDeck();
  };

  return (
    // fixme: animation - showing top-bottom, disappearing bottom-top
    <div className={wrapper} onClick={props.handleShowCreateDeck}>
      <form
        className={form}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl underline underline-offset-4">Create Deck</h2>
        <p>
          Input Title. Empty is NOT allowed.
          <br />
          Dup is allowed, but it will confused you :^)
        </p>

        {/* fixme: react-hook-form validation: required */}
        <input
          {...register("title")}
          className={input}
          placeholder="input title"
        />
      </form>
    </div>
  );
}
