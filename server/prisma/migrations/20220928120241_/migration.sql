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
INSERT INTO "new_Travel" ("addedById", "country", "dateRangeId", "description", "id", "location", "rating", "title", "travelCompanions") SELECT "addedById", "country", "dateRangeId", "description", "id", "location", "rating", "title", "travelCompanions" FROM "Travel";
DROP TABLE "Travel";
ALTER TABLE "new_Travel" RENAME TO "Travel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;