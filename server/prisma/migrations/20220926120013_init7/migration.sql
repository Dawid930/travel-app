-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

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
    "userId" TEXT,
    CONSTRAINT "Travel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Travel" ("author", "country", "description", "id", "location", "rating", "title", "travelCompanions") SELECT "author", "country", "description", "id", "location", "rating", "title", "travelCompanions" FROM "Travel";
DROP TABLE "Travel";
ALTER TABLE "new_Travel" RENAME TO "Travel";
CREATE TABLE "new_TravelDays" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "daynumber" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "travelId" TEXT,
    "userId" TEXT,
    CONSTRAINT "TravelDays_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TravelDays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TravelDays" ("author", "date", "daynumber", "description", "id", "travelId") SELECT "author", "date", "daynumber", "description", "id", "travelId" FROM "TravelDays";
DROP TABLE "TravelDays";
ALTER TABLE "new_TravelDays" RENAME TO "TravelDays";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
