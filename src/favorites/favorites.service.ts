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
    // const tracks = database.favorites.tracks.map((id) => {
    //   database.tracks.find((track) => track.id === id);
    // });

    // const albums = database.favorites.albums.map((id) => {
    //   database.albums.find((album) => album.id === id);
    // });

    // const artists = database.favorites.artists.map((id) => {
    //   database.artists.find((artist) => artist.id === id);
    // });
    return {
      tracks: database.favorites.tracks,
      albums: database.favorites.albums,
      artists: database.favorites.artists,
    };
  }

  addAlbum(id: string) {
    if (validate(id)) {
      if (database.albums.find((album) => album.id === id)) {
        database.favorites.albums.push(id);
        return id;
      } else {
        throw new UnprocessableEntityException();
      }
    } else {
      throw new BadRequestException('invalid id');
    }
  }

  addArtist(id: string) {
    if (validate(id)) {
      if (database.artists.find((artist) => artist.id === id)) {
        database.favorites.artists.push(id);
        return id;
      } else {
        throw new UnprocessableEntityException();
      }
    } else {
      throw new BadRequestException('invalid id');
    }
  }

  addTrack(id: string) {
    if (validate(id)) {
      if (database.tracks.find((track) => track.id === id)) {
        database.favorites.tracks.push(id);
        return id;
      } else {
        throw new UnprocessableEntityException();
      }
    } else {
      throw new BadRequestException('invalid id');
    }
  }

  deleteTrack(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    if (!database.favorites.tracks.find((track) => track === id))
      throw new NotFoundException('track not in favorites');

    database.favorites.tracks = database.favorites.tracks.filter(
      (track) => track !== id,
    );
    return;
  }

  deleteAlbum(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    if (!database.favorites.albums.find((album) => album === id))
      throw new NotFoundException('album not in favorites');

    database.favorites.albums = database.favorites.albums.filter(
      (album) => album !== id,
    );
    return;
  }

  deleteArtist(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    if (!database.favorites.artists.find((artist) => artist === id))
      throw new NotFoundException('artist not in favorites');

    database.favorites.artists = database.favorites.artists.filter(
      (artist) => artist !== id,
    );
    return;
  }
}
