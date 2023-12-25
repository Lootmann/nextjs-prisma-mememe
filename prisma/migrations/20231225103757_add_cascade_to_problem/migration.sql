-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Problem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "deckId" INTEGER NOT NULL,
    CONSTRAINT "Problem_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Problem" ("back", "deckId", "front", "id") SELECT "back", "deckId", "front", "id" FROM "Problem";
DROP TABLE "Problem";
ALTER TABLE "new_Problem" RENAME TO "Problem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
