import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly FavoritesService: FavoritesService) {}

  @HttpCode(200)
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getAll() {
    return this.FavoritesService.getAll();
  }

  @Post('album/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(201)
  addAlbum(@Param('id') id: string) {
    return this.FavoritesService.addAlbum(id);
  }

  @Post('track/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(201)
  addTrack(@Param('id') id: string) {
    return this.FavoritesService.addTrack(id);
  }

  @Post('artist/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(201)
  addArtist(@Param('id') id: string) {
    return this.FavoritesService.addArtist(id);
  }

  @Delete('track/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.FavoritesService.deleteTrack(id);
  }

  @Delete('album/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.FavoritesService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.FavoritesService.deleteArtist(id);
  }
}
