import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateArtistDto } from './create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate } from 'uuid';
import { UpdateArtistDto } from './update-artist.dto';
import { database } from 'src/database/database';
const prisma = new PrismaClient();
@Injectable()
export class ArtistService {
  getAll() {
    return database.artists;
  }

  getArtistById(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    const artist = database.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException('artist not found');
    else return artist;
  }

  createArtist(dto: CreateArtistDto) {
    if (!(dto?.name && dto?.grammy)) {
      throw new BadRequestException('dto missing required fields');
    } else {
      const artistData = {
        id: uuidv4(),
        name: dto.name,
        grammy: dto.grammy,
      };
      database.artists.push(artistData);
      return artistData;
    }
  }

  updateArtistById(id: string, dto: UpdateArtistDto) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    const index = database.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException('artist not found');

    if (
      (!dto?.name && !dto?.grammy) ||
      (dto?.name && typeof dto?.name !== 'string') ||
      (dto?.grammy && typeof dto?.grammy !== 'boolean')
    )
      throw new BadRequestException('invalid dto');
    const artist = database.artists.find((artist) => artist.id === id);

    const newArtistData = {
      ...artist,
      name: dto.name,
      grammy: dto.grammy,
    };
    try {
      database.artists[index] = newArtistData;
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  deleteArtistById(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    const index = database.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException('artist not found');

    database.albums.forEach((album) => {
      if (album.artistId === id) album.artistId === null;
    });
    database.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId === null;
    });

    database.artists = database.artists.filter((artist) => artist.id !== id);
  }
}
