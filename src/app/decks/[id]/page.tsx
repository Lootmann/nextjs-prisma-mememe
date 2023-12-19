"use client";

import { DeckType } from "@/app/types/Deck";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const [deck, setDeck] = React.useState<DeckType>({
    id: 0,
    statement: "",
    answer: "",
  });

  React.useEffect(() => {
    const fetchDecks = async () => {
      const options = {
        method: "GET",
        "Content-Type": "application/json",
      };

      const resp = await fetch(`/api/decks/${params.id}`, options);
      const data = await resp.json();

      setDeck(data);
    };

    fetchDecks();
  }, []);

  return (
    <div>
      <h2>ID: {params.id}</h2>

      <p>{deck.statement}</p>
      <p>{deck.answer}</p>
    </div>
  );
}
