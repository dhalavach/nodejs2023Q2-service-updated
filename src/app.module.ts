import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user';
import { ArtistModule } from './artist/artist.module';
import { Artist } from './artist';
import { AlbumModule } from './album/album.module';
import { Album } from './album';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService, User, Artist, Album],
})
export class AppModule {}
