/*
  Warnings:

  - A unique constraint covering the columns `[travelId]` on the table `Travel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Travel_travelId_key" ON "Travel"("travelId");
