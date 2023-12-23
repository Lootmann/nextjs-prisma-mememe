import Link from "next/link";

export function Header() {
  return (
    <header className="py-1 flex bg-neutral-700">
      <nav className="flex gap-4 mx-auto text-xl items-center">
        {/* what the hell */}
        <img
          src="/images/header_icon.png"
          className="h-9 px-1 py-1 mr-6 bg-white"
        />
        <Link href={"/add/"}>Add</Link>
        <Link href={"/decks/"}>Decks</Link>
        <Link href={"/problems/"}>Problems</Link>
      </nav>
    </header>
  );
}
