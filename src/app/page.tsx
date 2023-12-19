"use client";

import React from "react";
import { DeckType } from "./types/Deck";

export default function Home() {
  const [decks, setDecks] = React.useState<DeckType[]>([]);

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
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-between">
      <h1 className="text-2xl mb-4">hello world Home</h1>

      <div>
        <ul>
          {decks.map((deck) => (
            <li>{deck.id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
