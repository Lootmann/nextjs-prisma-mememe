import Link from "next/link";

export function Header() {
  return (
    <header className="p-2 bg-neutral-700">
      <nav className="flex gap-4">
        <Link href={"/"}>Top</Link>
        <Link href={"/decks/"}>Decks</Link>
        <Link href={""}>Top</Link>
      </nav>
    </header>
  );
}
