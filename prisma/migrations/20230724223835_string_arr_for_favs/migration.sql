/*
  Warnings:

  - You are about to drop the column `favoritesFavoritesId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesFavoritesId` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesFavoritesId` on the `Track` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favoritesFavoritesId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favoritesFavoritesId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favoritesFavoritesId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favoritesFavoritesId";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "favoritesFavoritesId";

-- AlterTable
ALTER TABLE "Favorites" ADD COLUMN     "albums" TEXT[],
ADD COLUMN     "artists" TEXT[],
ADD COLUMN     "tracks" TEXT[];

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favoritesFavoritesId";
