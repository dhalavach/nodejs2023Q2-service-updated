import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly FavoritesService: FavoritesService) {}

  @HttpCode(200)
  @Get()
  getAll() {
    return this.FavoritesService.getAll();
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id') id: string) {
    return this.FavoritesService.addAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id') id: string) {
    return this.FavoritesService.addTrack(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id') id: string) {
    return this.FavoritesService.addArtist(id);
  }

  // @Delete('track/:id')
  // @HttpCode(204)
  // removeTrack(@Param('id') id: string) {
  //   return this.FavoritesService.removeTrack(id);
  // }

  // @Delete('album/:id')
  // @HttpCode(204)
  // removeAlbum(@Param('id') id: string) {
  //   return this.FavoritesService.removeAlbum(id);
  // }

  // @Delete('artist/:id')
  // @HttpCode(204)
  // removeArtist(@Param('id') id: string) {
  //   return this.FavoritesService.removeArtist(id);
  // }
}
