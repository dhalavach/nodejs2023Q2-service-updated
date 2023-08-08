import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { Logger } from './log/logging-service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, User, Artist, Album, Track, Favorites, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
