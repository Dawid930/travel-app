/*
  Warnings:

  - You are about to drop the column `author` on the `Travel` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `TravelDays` table. All the data in the column will be lost.

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
    "addedById" TEXT,
    CONSTRAINT "Travel_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Travel" ("addedById", "country", "description", "id", "location", "rating", "title", "travelCompanions") SELECT "addedById", "country", "description", "id", "location", "rating", "title", "travelCompanions" FROM "Travel";
DROP TABLE "Travel";
ALTER TABLE "new_Travel" RENAME TO "Travel";
CREATE TABLE "new_TravelDays" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "daynumber" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "travelId" TEXT,
    "dayAddedById" TEXT,
    CONSTRAINT "TravelDays_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TravelDays_dayAddedById_fkey" FOREIGN KEY ("dayAddedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TravelDays" ("date", "dayAddedById", "daynumber", "description", "id", "travelId") SELECT "date", "dayAddedById", "daynumber", "description", "id", "travelId" FROM "TravelDays";
DROP TABLE "TravelDays";
ALTER TABLE "new_TravelDays" RENAME TO "TravelDays";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
