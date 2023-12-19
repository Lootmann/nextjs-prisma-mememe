import Link from "next/link";

export function Header() {
  return (
    <header className="p-2 flex bg-neutral-700 justify-center">
      <nav className="flex gap-4">
        <Link href={"/"}>Top</Link>
        <Link href={"/add/"}>Add</Link>
        <Link href={"/decks/"}>Decks</Link>
      </nav>
    </header>
  );
}
