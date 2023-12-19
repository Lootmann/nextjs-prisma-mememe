"use client";

import React from "react";
import { DeckType } from "../types/Deck";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

const table_row = `border px-2 py-1`;

export default function Page({ children }: { children: React.ReactDOM }) {
  const [decks, setDecks] = React.useState<DeckType[]>([]);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<DeckType>();

  const onSubmit: SubmitHandler<DeckType> = async (data) => {
    const options = {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({ statement: data.statement, answer: data.answer }),
    };

    const resp = await fetch("/api/decks", options);
    // const ret = await resp.json();
    console.log(resp);

    setRefresh(!refresh);
    reset({ statement: "", answer: "" });
  };

  React.useEffect(() => {
    const fetchDecks = async () => {
      const options = {
        method: "GET",
        "Content-Type": "application/json",
      };

      const resp = await fetch("/api/decks", options);
      const data = await resp.json();

      setDecks(data);
    };

    fetchDecks();
  }, [refresh, reset]);

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

        <table className="table-auto">
          <thead>
            <tr className={table_row}>
              <th className={table_row}>id</th>
              <th className={table_row}>statement</th>
              <th className={table_row}>answer</th>
              <th className={table_row}>Edit</th>
            </tr>
          </thead>

          <tbody>
            {decks.map((deck) => (
              <tr key={deck.id} className={table_row}>
                <td className={table_row}>{deck.id}</td>
                <td className={table_row}>{deck.statement}</td>
                <td className={table_row}>{deck.answer}</td>
                <td className={table_row}>
                  <Link href={`/decks/${deck.id}`}>edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
