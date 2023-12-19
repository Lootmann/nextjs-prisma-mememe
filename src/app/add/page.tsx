/**
 * add/
 */
"use client";

import React from "react";
import { DeckType } from "../types/Deck";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProblemInputType } from "../types/Problem";

const field = `flex gap-4`;
const label = `px-2 py-1 w-18`;
const input = `
  py-1 px-2 text-xl border rounded-md
  flex-1 grow
  text-neutral-200 bg-neutral-900 border-neutral-900
  focus:border-neutral-300
  outline-none`;

export default function Add() {
  const [decks, setDecks] = React.useState<DeckType[]>([]);
  const { register, handleSubmit, reset } = useForm<ProblemInputType>();

  const onSubmit: SubmitHandler<ProblemInputType> = async (data) => {
    console.log(data);
  };

  React.useEffect(() => {
    const fetchDecks = async () => {
      const options = {
        method: "GET",
        "Content-Type": "application/json",
      };

      const resp = await fetch("/api/decks", options);
      const data = await resp.json();

      if (!resp.ok) {
        console.log(data);
      }

      reset({ front: "", back: "", deckId: data.deckId });
      setDecks(data);
    };

    fetchDecks();
  }, []);

  return (
    <div className="h-full p-4 flex flex-col gap-6 border rounded-md text-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className={`${field}`}>
          <label className={`${label}`}>label</label>
          <select {...register("deckId")} className={`${input} bg-lime-900`}>
            {decks.map((deck) => (
              <option key={deck.id} value={`${deck.id}`}>
                {deck.title}
              </option>
            ))}
          </select>
        </div>

        <div className={`${field}`}>
          <label className={`${label}`}>Front</label>
          <input type="text" {...register("front")} className={`${input}`} />
        </div>

        <div className={`${field}`}>
          <label className={`${label}`}>Back</label>
          <input type="text" {...register("back")} className={`${input}`} />
        </div>

        <div className={`${field}`}>
          <input type="submit" value="Add" className={`${input}`} />
        </div>
      </form>

      <div className="p-4 gap-4 border">
        <h2 className="text-xl mb-4">Deck Lists</h2>
        <ul className="p-2">
          {decks.map((deck) => (
            <li key={deck.id}>
              {deck.id}. {deck.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
