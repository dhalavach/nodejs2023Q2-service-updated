/*
  Warnings:

  - You are about to drop the column `albums` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `artists` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `tracks` on the `Favorites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "favoritesFavoritesId" TEXT;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "favoritesFavoritesId" TEXT;

-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "albums",
DROP COLUMN "artists",
DROP COLUMN "tracks";

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "favoritesFavoritesId" TEXT;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favoritesFavoritesId_fkey" FOREIGN KEY ("favoritesFavoritesId") REFERENCES "Favorites"("favoritesId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favoritesFavoritesId_fkey" FOREIGN KEY ("favoritesFavoritesId") REFERENCES "Favorites"("favoritesId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favoritesFavoritesId_fkey" FOREIGN KEY ("favoritesFavoritesId") REFERENCES "Favorites"("favoritesId") ON DELETE SET NULL ON UPDATE CASCADE;
