import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user';
import { ArtistModule } from './artist/artist.module';
import { Artist } from './artist';
import { AlbumModule } from './album/album.module';
import { Album } from './album';
import { TrackModule } from './track/track.module';
import { Track } from './track';
import { FavoritesModule } from './favorites/favorites.module';
import { Favorites } from './favorites';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService, User, Artist, Album, Track, Favorites],
})
export class AppModule {}
