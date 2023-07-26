import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { v4 as uuidv4 } from 'uuid';

import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { validate } from 'uuid';
import { Album } from 'src/album';
import { FavoritesData } from 'src/types/types';
import { database } from 'src/database/database';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  getAll() {
    const tracks = database.favorites.tracks.map((id) =>
      this.trackService.getTrackById(id),
    );
    const albums = database.favorites.albums.map((id) =>
      this.albumService.getAlbumById(id),
    );
    const artists = database.favorites.artists.map((id) =>
      this.artistService.getArtistById(id),
    );
    return {
      tracks,
      albums,
      artists,
    };
  }

  addAlbum(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    if (!database.albums.find((album) => album === id))
      throw new UnprocessableEntityException();
    if (!database.favorites.albums.find((album) => album === id))
      database.favorites.albums.push(id);
  }

  addArtist(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    if (!database.artists.find((album) => album === id))
      throw new UnprocessableEntityException();
    if (!database.favorites.artists.find((artist) => artist === id))
      database.favorites.albums.push(id);
  }

  addTrack(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    if (!database.tracks.find((album) => album === id))
      throw new UnprocessableEntityException();
    if (!database.favorites.tracks.find((track) => track === id))
      database.favorites.tracks.push(id);
  }

  deleteTrack(id: string) {
    if (!database.favorites.tracks.find((track) => track === id)) {
      throw new NotFoundException('track not in favorites');
    }

    database.favorites.tracks = database.favorites.tracks.filter(
      (track) => track !== id,
    );
  }

  async deleteAlbum(id: string) {
    if (!database.favorites.albums.find((album) => album === id)) {
      throw new NotFoundException('album not in favorites');
    }
    database.favorites.albums = database.favorites.albums.filter(
      (album) => album !== id,
    );
  }

  deleteArtist(id: string) {
    if (!database.favorites.artists.find((artist) => artist === id)) {
      throw new NotFoundException('artist not in favorites');
    }
    database.favorites.artists = database.favorites.artists.filter(
      (artist) => artist !== id,
    );
  }
}
