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
    const tracks = [];
    const albums = [];
    const artists = [];

    database.favorites.tracks.forEach((id) => {
      const track = database.tracks.find((track) => track.id === id);
      if (track) tracks.push(track);
    });

    database.favorites.albums.forEach((id) => {
      const album = database.albums.find((album) => album.id === id);
      if (album) albums.push(album);
    });

    database.favorites.artists.forEach((id) => {
      const artist = database.artists.find((artist) => artist.id === id);
      if (artist) artists.push(artist);
    });

    return {
      tracks,
      albums,
      artists,
    };
  }

  addAlbum(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    const index = database.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new UnprocessableEntityException();
    database.favorites.albums.push(id);
    return 'albums added to favs';
  }

  addArtist(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    const index = database.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new UnprocessableEntityException();
    database.favorites.artists.push(id);
    return 'artist added to favs';
  }

  addTrack(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    const index = database.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new UnprocessableEntityException();
    database.favorites.tracks.push(id);
    return 'track added to favs';
  }

  // async addArtist(id: string) {
  //   if (validate(id)) {
  //     const artist = await this.artistService.getArtistById(id);
  //     if (artist) {
  //       database.favorites.artists.push(artist.id);
  //       return artist;
  //     } else {
  //       throw new UnprocessableEntityException();
  //     }
  //   } else {
  //     throw new BadRequestException('invalid id');
  //   }
  // }

  // async addTrack(id: string) {
  //   if (validate(id)) {
  //     const track = await this.trackService.getTrackById(id);
  //     if (track) {
  //       database.favorites.tracks.push(track.id);
  //       return track;
  //     } else {
  //       throw new UnprocessableEntityException();
  //     }
  //   } else {
  //     throw new BadRequestException('invalid id');
  //   }
  // }

  deleteTrack(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    const index = database.favorites.tracks.findIndex((e) => e === id);
    if (index === -1) throw new NotFoundException('track not in favorites');
    // database.favorites.tracks.splice(index, 1);
    database.favorites.tracks = database.favorites.tracks.filter(
      (track) => track !== id,
    );
    return 'track deleted';
  }

  deleteAlbum(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    const index = database.favorites.albums.findIndex((e) => e === id);
    if (index === -1) throw new NotFoundException('album not in favorites');
    database.favorites.albums = database.favorites.albums.filter(
      (album) => album !== id,
    );
    return;
  }

  deleteArtist(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    const index = database.favorites.artists.findIndex((e) => e === id);
    if (index === -1) throw new NotFoundException('artist not in favorites');
    database.favorites.artists = database.favorites.artists.filter(
      (artist) => artist !== id,
    );
    return;
  }
}
