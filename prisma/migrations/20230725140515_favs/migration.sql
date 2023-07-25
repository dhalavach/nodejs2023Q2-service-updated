-- CreateTable
CREATE TABLE "Favorites" (
    "favoritesId" TEXT NOT NULL,
    "artists" TEXT[],
    "albums" TEXT[],
    "tracks" TEXT[],

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("favoritesId")
);
