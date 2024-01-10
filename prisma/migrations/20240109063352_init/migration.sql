-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "version" TEXT NOT NULL,
    "downurl" TEXT NOT NULL,
    "gamepath" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_version_key" ON "Game"("version");
