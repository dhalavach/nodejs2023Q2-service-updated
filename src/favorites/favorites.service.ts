import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { v4 as uuidv4 } from 'uuid';

import { PrismaClient } from '@prisma/client';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { validate } from 'uuid';
import { Album } from 'src/album';
import { FavoritesData } from 'src/types/types';
const prisma = new PrismaClient();

@Injectable()
export class FavoritesService {
  async getAll() {
    const favs = await prisma.favorites.findFirst();
    if (!favs) return { artists: [], albums: [], tracks: [] };
    const tracks = favs?.tracks.map(
      (id) =>
        prisma.track.findFirst({
          where: {
            id: id,
          },
        }) || [],
    );

    const albums = favs?.albums.map(
      (id) =>
        prisma.album.findFirst({
          where: {
            id: id,
          },
        }) || [],
    );

    const artists = favs?.artists.map(
      (id) =>
        prisma.artist.findFirst({
          where: {
            id: id,
          },
        }) || [],
    );

    return {
      tracks,
      albums,
      artists,
    };
  }

  async addAlbum(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    const album = await prisma.album.findFirst({
      where: {
        id: id,
      },
    });
    if (!album) throw new UnprocessableEntityException();
    const data = await prisma.favorites.findFirst();
    const favObject = {
      favoritesId: uuidv4(),
      albums: [],
      artists: [],
      tracks: [],
    };

    //if (!data) throw new NotFoundException('favorites not found');
    if (!data) {
      await prisma.favorites.create({ data: favObject });
    }
    const albums = data.albums;
    albums.push(album.id);
    const favId = data ? data.favoritesId : favObject.favoritesId;
    await prisma.favorites.update({
      where: {
        favoritesId: favId,
      },
      data: { ...data, albums: albums },
    });
    return album;
  }

  async addArtist(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    const artist = await prisma.artist.findFirst({
      where: {
        id: id,
      },
    });
    if (!artist) throw new UnprocessableEntityException();

    const data = await prisma.favorites.findFirst();
    //if (!data) throw new NotFoundException('favorites not found');
    if (!data) {
      const favObject = {
        favoritesId: uuidv4(),
        albums: [],
        artists: [],
        tracks: [],
      };
      favObject.artists.push(artist);
      await prisma.favorites.create({ data: favObject });
    }

    // const artistData = data.artists;
    // artistData.push(id);
    const newData = { ...data };
    return await prisma.favorites.update({
      where: {
        favoritesId: data.favoritesId,
      },
      data: newData,
    });
  }

  async addTrack(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    const track = await prisma.track.findFirst({
      where: {
        id: id,
      },
    });
    if (!track) throw new UnprocessableEntityException();

    const data = await prisma.favorites.findFirst();
    // if (!data) throw new NotFoundException('favorites not found');
    // if (!data) {
    //   const favObject = {
    //     favoritesId: uuidv4(),
    //     albums: [],
    //     artists: [],
    //     tracks: [],
    //   };
    //   await prisma.favorites.create({ data: favObject });
    // }

    // const trackData = data.tracks;
    // trackData.push(id);
    const newData = { ...data };
    return await prisma.favorites.update({
      where: {
        favoritesId: data.favoritesId,
      },
      data: newData,
    });
  }
}
