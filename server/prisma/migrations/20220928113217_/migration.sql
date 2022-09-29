/*
  Warnings:

  - You are about to drop the column `travelId` on the `DateRange` table. All the data in the column will be lost.
  - Added the required column `dateRangeId` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Travel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "travelCompanions" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "dateRangeId" TEXT NOT NULL,
    "addedById" TEXT,
    CONSTRAINT "Travel_dateRangeId_fkey" FOREIGN KEY ("dateRangeId") REFERENCES "DateRange" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Travel_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Travel" ("addedById", "country", "description", "id", "location", "rating", "title", "travelCompanions") SELECT "addedById", "country", "description", "id", "location", "rating", "title", "travelCompanions" FROM "Travel";
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