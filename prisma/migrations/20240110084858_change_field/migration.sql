/*
  Warnings:

  - You are about to drop the column `downurl` on the `Game` table. All the data in the column will be lost.
  - Added the required column `save` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "version" TEXT NOT NULL,
    "save" TEXT NOT NULL,
    "gamepath" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Game" ("gamepath", "id", "version") SELECT "gamepath", "id", "version" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_version_key" ON "Game"("version");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
