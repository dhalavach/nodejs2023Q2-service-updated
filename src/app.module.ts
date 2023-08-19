import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { Logger } from './log/logging-service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';
import { TrackService } from './track/track.service';
import { FavoritesService } from './favorites/favorites.service';
import { JwtService } from '@nestjs/jwt';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    AuthModule,
    PrismaModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    ArtistService,
    AlbumService,
    TrackService,
    FavoritesService,
    Logger,
    AuthService,
    JwtService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
