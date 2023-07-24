import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user';
import { ArtistModule } from './artist/artist.module';
import { Artist } from './artist';

@Module({
  imports: [UserModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService, User, Artist],
})
export class AppModule {}
