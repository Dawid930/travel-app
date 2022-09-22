/*
  Warnings:

  - You are about to drop the column `travelId` on the `DateRange` table. All the data in the column will be lost.

*/
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
    "dateRangeId" TEXT,
    CONSTRAINT "Travel_dateRangeId_fkey" FOREIGN KEY ("dateRangeId") REFERENCES "DateRange" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Travel" ("author", "country", "description", "id", "location", "rating", "title", "travelCompanions") SELECT "author", "country", "description", "id", "location", "rating", "title", "travelCompanions" FROM "Travel";
DROP TABLE "Travel";
ALTER TABLE "new_Travel" RENAME TO "Travel";
CREATE TABLE "new_DateRange" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL
);
INSERT INTO "new_DateRange" ("end", "id", "start") SELECT "end", "id", "start" FROM "DateRange";
DROP TABLE "DateRange";
ALTER TABLE "new_DateRange" RENAME TO "DateRange";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
