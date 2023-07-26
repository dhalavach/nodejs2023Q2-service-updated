import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateAlbumDto } from './create-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate } from 'uuid';
import { UpdateAlbumDto } from './update-album.dto';
import { database } from 'src/database/database';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  async getAll() {
    return database.albums;
  }

  getAlbumById(id: string) {
    if (validate(id)) {
      const album = database.albums.find((album) => album.id === id);
      if (album) return album;
      else throw new NotFoundException('album not found');
    } else throw new BadRequestException('invalid id');
  }

  createAlbum(dto: CreateAlbumDto) {
    if (!(dto?.name && dto?.year)) {
      throw new BadRequestException('dto missing required fields');
    } else {
      const albumData = {
        id: uuidv4(),
        name: dto.name,
        year: dto.year,
        artistId: dto.artistId,
      };
      database.albums.push(albumData);
    }
  }

  updateAlbumById(id: string, dto: UpdateAlbumDto) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    const index = database.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException('album not found');

    if (
      (!dto?.name && !dto?.year && !dto?.artistId) ||
      (dto?.name && typeof dto?.name !== 'string') ||
      (dto?.year && typeof dto?.year !== 'number') ||
      (dto?.artistId && typeof dto?.artistId !== 'string')
    )
      throw new BadRequestException('invalid dto');
    const album = database.albums.find((album) => album.id === id);
    const newAlbumData = {
      ...album,
      name: dto?.name,
      year: dto?.year,
      artistId: dto?.artistId,
    };

    database.albums[index] = newAlbumData;
    return newAlbumData;
  }

  deleteAlbumById(id: string) {
    if (validate(id) === false) throw new BadRequestException('invalid id');
    const index = database.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException('album not found');

    database.tracks.forEach((track) => {
      if (track.albumId === id) track.albumId === null;
    });
    database.favorites.albums = database.albums.filter((album) => album !== id);
    database.albums = database.albums.filter((album) => album !== id);
    return true;
  }
}
