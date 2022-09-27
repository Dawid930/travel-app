/*
  Warnings:

  - A unique constraint covering the columns `[travelId]` on the table `TravelDays` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TravelDays_travelId_key" ON "TravelDays"("travelId");
