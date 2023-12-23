"use client";

import { DeckType, DeckUpdateType } from "@/types/Deck";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  params: {
    id: string;
  };
};

const form = `
  flex flex-col gap-4 items-center`;

const inner = `
  py-2 px-4 flex flex-col gap-4
  border rounded-md`;

const field = `
  w-full
  flex gap-2`;

const button = `
  border px-2 rounded-md outline-none
  hover:bg-neutral-200 hover:text-neutral-900
  focus:bg-neutral-200 focus:text-neutral-900 duration-200`;

export default function Page({ params }: Props) {
  const [deck, setDeck] = React.useState<DeckType | null>(null);

  React.useEffect(() => {
    const fetchDecks = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const resp = await fetch(`/api/decks/${params.id}`, options);
      const data = await resp.json();

      setDeck(data);
    };

    fetchDecks();
  }, []);

  const { register, handleSubmit } = useForm<DeckUpdateType>();

  const onSubmit: SubmitHandler<DeckUpdateType> = async (formData) => {
    console.log("onSubmit:", formData);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: params.id, title: formData.title }),
    };
    const resp = await fetch(`/api/decks/${params.id}`, options);
    const data = await resp.json();
  };

  return (
    <div className="h-full w-full flex flex-col items-center gap-6">
      {deck && (
        <form onSubmit={handleSubmit(onSubmit)} className={`${form}`}>
          <div className={`${inner}`}>
            <div className={`${field}`}>
              <label className="flex-1">Deck ID</label>
              <p className="flex-1">{deck.id}</p>
            </div>

            <div className={`${field}`}>
              <label className="flex-1">Num of Problems</label>
              <p className="flex-1">{deck.problems.length}</p>
            </div>

            <div className={`${field}`}>
              <label>Title</label>
              <input
                type="text"
                {...register("title")}
                defaultValue={deck.title}
                className="px-2 flex-1 bg-neutral-800 text-neutral-200 rounded-md"
              />
            </div>
          </div>

          <div>
            <input type="submit" value="Update" className={`${button}`} />
          </div>
        </form>
      )}
    </div>
  );
}
