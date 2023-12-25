import { DeckDeleteType } from "@/types/Deck";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  id: number;
  title: string;
  handleShowDeleteDeck: () => void;
  toggleRefresh: () => void;
};

export function DeleteDeck(props: Props) {
  const wrapper = `
    h-full w-full absolute top-0 left-0 z-10
    flex justify-center
    bg-zinc-800 bg-opacity-30`;

  const form = `
    relative
    h-44 px-2 mx-auto mt-10
    flex flex-col gap-4 justify-center items-center
    bg-slate-700 border border-red-400 rounded-md
    animate-slideInDown`;

  const delete_button = `
    px-2
    text-red-600 
    border border-red-600 rounded-md
    hover:bg-red-600 hover:text-neutral-100 duration-200`;

  const { handleSubmit } = useForm<DeckDeleteType>();

  const onSubmit: SubmitHandler<DeckDeleteType> = async () => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const resp = await fetch(`/api/decks/${props.id}`, options);
    const data = await resp.json();

    if (resp.ok) {
      props.toggleRefresh();
      props.handleShowDeleteDeck();
    } else {
      // fixme: error validation
      console.log(resp);
    }
  };

  return (
    <div className={`${wrapper}`} onClick={props.handleShowDeleteDeck}>
      <form
        className={form}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl underline underline-offset-4">
          Are you sure to delete it ???
        </h2>

        <p>title: {props.title}</p>

        <input type="submit" value="Delete" className={delete_button} />
      </form>
    </div>
  );
}
