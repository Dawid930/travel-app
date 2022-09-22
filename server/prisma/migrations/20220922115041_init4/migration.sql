/*
  Warnings:

  - You are about to drop the `DateRange` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dateRange` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DateRange";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Travel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "travelCompanions" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "dateRange" TEXT NOT NULL
);
INSERT INTO "new_Travel" ("author", "country", "description", "id", "location", "rating", "title", "travelCompanions") SELECT "author", "country", "description", "id", "location", "rating", "title", "travelCompanions" FROM "Travel";
DROP TABLE "Travel";
ALTER TABLE "new_Travel" RENAME TO "Travel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
