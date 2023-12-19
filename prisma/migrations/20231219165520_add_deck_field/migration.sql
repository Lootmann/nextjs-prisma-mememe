/*
  Warnings:

  - You are about to drop the column `answer` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `statement` on the `Deck` table. All the data in the column will be lost.
  - Added the required column `title` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deck" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);
INSERT INTO "new_Deck" ("id") SELECT "id" FROM "Deck";
DROP TABLE "Deck";
ALTER TABLE "new_Deck" RENAME TO "Deck";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
