-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TravelDays" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "daynumber" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "travelId" TEXT NOT NULL,
    "dayAddedById" TEXT,
    CONSTRAINT "TravelDays_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TravelDays_dayAddedById_fkey" FOREIGN KEY ("dayAddedById") REFERENCES "User" ("email") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TravelDays" ("date", "dayAddedById", "daynumber", "description", "id", "travelId") SELECT "date", "dayAddedById", "daynumber", "description", "id", "travelId" FROM "TravelDays";
DROP TABLE "TravelDays";
ALTER TABLE "new_TravelDays" RENAME TO "TravelDays";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
