"use client";

import React from "react";
import { DeckType } from "../types/Deck";
import { SubmitHandler, useForm } from "react-hook-form";

export default function layout({ children }: { children: React.ReactDOM }) {
  const [decks, setDecks] = React.useState<DeckType[]>([]);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const { register, handleSubmit } = useForm<DeckType>();

  const onSubmit: SubmitHandler<DeckType> = async (data) => {
    const options = {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({ statement: data.statement, answer: data.answer }),
    };

    const resp = await fetch("/api/decks", options);
    console.log(resp);

    const ret = await resp.json();
    console.log(ret);
    setRefresh(!refresh);
  };

  React.useEffect(() => {
    const fetchDecks = async () => {
      const options = {
        method: "GET",
        "Content-Type": "application/json",
      };
      const resp = await fetch("/api/decks", options);
      const data = await resp.json();
      console.log(resp);
      console.log(data);
      setDecks(data);
    };

    fetchDecks();
  }, [refresh]);

  return (
    <div className="h-full w-full flex flex-col gap-4 text-xl">
      <div className="p-2 border rounded-md flex flex-col gap-4">
        <h2 className="text-xl">Create Decks</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 text-slate-100"
        >
          <input
            type="text"
            {...register("statement")}
            placeholder="Statement"
            autoComplete="off"
            className="pl-2 bg-slate-900 rounded-sm"
          />

          <input
            type="text"
            {...register("answer")}
            placeholder="Answer"
            autoComplete="off"
            className="pl-2 bg-slate-900 rounded-sm"
          />

          <input
            type="submit"
            value="Create"
            className="bg-slate-700 rounded-sm"
          />
        </form>
      </div>

      <div className="border p-2 rounded-md">
        <h2 className="text-xl mb-2">All Decks</h2>

        <ul>
          {decks.map((deck) => (
            <li key={deck.id} className="underline underline-offset-2">
              {deck.statement}, {deck.answer}
            </li>
          ))}
          <li></li>
        </ul>
      </div>
    </div>
  );
}
