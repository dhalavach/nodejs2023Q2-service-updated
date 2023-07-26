import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateTrackDto } from './create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate } from 'uuid';
import { UpdateTrackDto } from './update-track.dto';
import { database } from 'src/database/database';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  getAll() {
    return database.tracks;
  }

  getTrackById(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id');
    } else {
      const track = database.tracks.find((track) => track.id === id);
      if (!track) {
        throw new NotFoundException('track not found');
      } else return track;
    }
  }

  createTrack(dto: CreateTrackDto) {
    if (
      !(dto?.name && dto?.duration) ||
      typeof dto?.name !== 'string' ||
      typeof dto?.duration !== 'number'
    ) {
      throw new BadRequestException('dto missing required fields');
    } else {
      const trackData = {
        id: uuidv4(),
        name: dto.name,
        duration: dto.duration,
        artistId: dto?.artistId,
        albumId: dto?.albumId,
      };
      database.tracks.push(trackData);
      return trackData;
    }
  }

  updateTrackById(id: string, dto: UpdateTrackDto) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    const track = database.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException('track not found');

    if (
      (!dto?.name && !dto?.duration && !dto?.artistId && !dto?.albumId) ||
      (dto?.name && typeof dto?.name !== 'string') ||
      (dto?.duration && typeof dto?.duration !== 'number') ||
      (dto?.artistId && typeof dto?.artistId !== 'string') ||
      (dto?.albumId && typeof dto?.albumId !== 'string')
    )
      throw new BadRequestException('invalid dto');

    const newTrackData = {
      ...track,
      ...dto,
    };
    const index = database.tracks.findIndex((track) => track.id === id);

    database.tracks[index] = newTrackData;
    return index;
  }

  deleteTrackById(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    const index = database.tracks.findIndex((track) => track.id === id);

    if (index === -1) throw new NotFoundException('track not found');

    return database.tracks.splice(index);
  }
}
