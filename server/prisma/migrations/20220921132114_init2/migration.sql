/*
  Warnings:

  - You are about to alter the column `travelId` on the `DateRange` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `travelId` on the `TravelDays` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Travel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Travel` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DateRange" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "travelId" INTEGER NOT NULL,
    CONSTRAINT "DateRange_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DateRange" ("end", "id", "start", "travelId") SELECT "end", "id", "start", "travelId" FROM "DateRange";
DROP TABLE "DateRange";
ALTER TABLE "new_DateRange" RENAME TO "DateRange";
CREATE TABLE "new_TravelDays" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "daynumber" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "travelId" INTEGER NOT NULL,
    CONSTRAINT "TravelDays_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TravelDays" ("author", "date", "daynumber", "description", "id", "travelId") SELECT "author", "date", "daynumber", "description", "id", "travelId" FROM "TravelDays";
DROP TABLE "TravelDays";
ALTER TABLE "new_TravelDays" RENAME TO "TravelDays";
CREATE TABLE "new_Travel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "travelCompanions" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL
);
INSERT INTO "new_Travel" ("author", "country", "description", "id", "location", "rating", "title", "travelCompanions") SELECT "author", "country", "description", "id", "location", "rating", "title", "travelCompanions" FROM "Travel";
DROP TABLE "Travel";
ALTER TABLE "new_Travel" RENAME TO "Travel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
