import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './create-album.dto';
import { UpdateAlbumDto } from './update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly AlbumService: AlbumService) {}

  @Get()
  getAll() {
    return this.AlbumService.getAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.AlbumService.getAlbumById(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() dto: CreateAlbumDto) {
    return this.AlbumService.createAlbum(dto);
  }

  @Put(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.AlbumService.updateAlbumById(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUserById(@Param('id') id: string) {
    return this.AlbumService.deleteAlbumById(id);
  }
}
