"use client";

import { DeckType } from "@/types/Deck";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const table_row = `border px-2 py-1`;

export default function Page() {
  const [decks, setDecks] = React.useState<DeckType[]>([]);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<DeckType>();

  const onSubmit: SubmitHandler<DeckType> = async (data) => {
    const options = {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({ title: data.title }),
    };

    const resp = await fetch("/api/decks", options);

    if (!resp.ok) {
      console.log(resp);
    }

    setRefresh(!refresh);
    reset({ title: "" });
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

  const title = `
    pl-2 bg-slate-200 text-slate-800 rounded-sm`;

  const createButton = `
    border rounded-sm outline-none
    hover:bg-green-400 hover:text-neutral-900 hover:border-green-400
    focus:bg-green-400 focus:text-neutral-900 focus:border-green-400
    duration-200`;

  return (
    <div className="h-full w-full flex flex-col gap-4 text-xl">
      <div className="p-2 border rounded-md flex flex-col gap-4">
        <h2 className="text-xl">Create Decks</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-2 flex flex-col gap-6 text-slate-100"
        >
          <input
            type="text"
            {...register("title")}
            placeholder="Title"
            autoComplete="off"
            className={title}
          />

          <input type="submit" value="Create" className={createButton} />
        </form>
      </div>

      <div className="border p-2 rounded-md">
        <h2 className="text-xl mb-2">All Decks</h2>

        <table className="table-auto">
          <thead>
            <tr className={table_row}>
              <th className={table_row}>id</th>
              <th className={table_row}>title</th>
              <th className={table_row}>Edit</th>
            </tr>
          </thead>

          <tbody>
            {decks.map((deck) => (
              <tr key={deck.id} className={table_row}>
                <td className={table_row}>{deck.id}</td>
                <td className={table_row}>{deck.title}</td>
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
