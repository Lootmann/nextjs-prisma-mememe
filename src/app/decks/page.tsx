/**
 * decks/
 */
"use client";

import React from "react";
import Link from "next/link";
import { DeckType } from "../../types/Deck";
import { CreateDeck } from "@/components/decks/CreateDeck";

const inner = `py-4 px-8
  h-full w-full flex flex-col flex-1 grow items-stretch
  border border-neutral-200 rounded-md`;

const deck_row = `text-xl px-2 py-1
  flex gap-4
  hover:bg-stone-800 rounded-md`;

const link = `
  px-1
  hover:bg-sky-300 hover:text-neutral-900 rounded-md duration-200`;

const footer = `py-4 px-8
  w-full flex gap-4 justify-center
  border border-neutral-200 rounded-md`;

const button = `p-2 text-xl text-bold
  border rounded-md
  hover:bg-neutral-200 hover:text-neutral-900 duration-100`;

export default function Home() {
  const [decks, setDecks] = React.useState<DeckType[]>([]);
  const [showCreateDeck, setShowCreateDeck] = React.useState<boolean>(false);
  const [refresh, setRefresh] = React.useState<boolean>(false);

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleShowCreateDeck = () => {
    setShowCreateDeck(false);
  };

  React.useEffect(() => {
    const fetchDecks = async () => {
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const resp = await fetch("/api/decks", options);
      const data = await resp.json();

      // fixme: validation createDeck
      if (!resp.ok) {
        console.log(data);
      }

      setDecks(data);
    };

    fetchDecks();
  }, [refresh]);

  return (
    <div className="h-full w-full flex flex-col gap-4 items-center">
      <div className={`${inner}`}>
        {decks.map((deck) => (
          <div key={deck.id} className={`${deck_row}`}>
            <Link href={`/learn/${deck.id}`} className="grow">
              {deck.title}
            </Link>
            <p>problems</p>
            <Link href={`/decks/${deck.id}`} className={`${link}`}>
              edit
            </Link>
            <p>delete</p>
          </div>
        ))}
      </div>

      <footer className={`${footer}`}>
        {showCreateDeck && (
          <CreateDeck
            handleShowCreateDeck={handleShowCreateDeck}
            toggleRefresh={toggleRefresh}
          />
        )}
        <button className={button} onClick={() => setShowCreateDeck(true)}>
          Create Deck
        </button>
      </footer>
    </div>
  );
}
