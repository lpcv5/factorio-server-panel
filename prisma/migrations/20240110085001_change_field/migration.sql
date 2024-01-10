-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "version" TEXT NOT NULL,
    "save" TEXT NOT NULL DEFAULT '',
    "gamepath" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Game" ("gamepath", "id", "save", "version") SELECT "gamepath", "id", "save", "version" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_version_key" ON "Game"("version");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
