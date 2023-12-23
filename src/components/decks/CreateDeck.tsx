/**
 * popup Create Deck Component
 */
import { DeckCreateType } from "@/types/Deck";
import { SubmitHandler, useForm } from "react-hook-form";

// if you click outside the form, remove entier form
type Props = {
  handleShowCreateDeck: () => void;
  toggleRefresh: () => void;
};

export function CreateDeck(props: Props) {
  const wrapper = `
    h-full w-full absolute top-0 z-10
    flex justify-center
    bg-zinc-800 bg-opacity-60`;

  const form = `
    relative
    h-44 px-2 mx-auto mt-10
    flex flex-col gap-4 justify-center items-center
    bg-slate-700
    border border-slate-400 rounded-md
    animate-slideInDown`;

  const input = `
    px-2
    text-xl
    text-neutral-900
    rounded-md`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeckCreateType>();

  const onSubmit: SubmitHandler<DeckCreateType> = async (data) => {
    console.log(data);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: data.title }),
    };
    const resp = await fetch("/api/decks", options);

    // fixme: add validation
    if (!resp.ok) {
      console.log(resp);
    }

    props.toggleRefresh();
    props.handleShowCreateDeck();
  };

  return (
    <div className={`${wrapper}`} onClick={props.handleShowCreateDeck}>
      <form
        className={form}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl underline underline-offset-4">Create Deck</h2>

        {errors.title ? (
          <p className="text-red-500">
            Empty is Not Allowed ヽ&#40;｀Д´#&#41;ﾉ
          </p>
        ) : (
          <p>
            Input Deck title. Empty is not allowed.
            <br />
            Dup is allowed, but it will confuse you :^&#41;
          </p>
        )}

        <input
          {...register("title", { required: true })}
          className={input}
          placeholder="input title"
        />
      </form>
    </div>
  );
}
