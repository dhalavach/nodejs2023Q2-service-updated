import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateArtistDto } from './create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate } from 'uuid';
import { UpdateArtistDto } from './update-artist.dto';
const prisma = new PrismaClient();
@Injectable()
export class ArtistService {
  async getAll() {
    return await prisma.artist.findMany();
  }

  async getArtistById(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    const artist = await prisma.artist.findFirst({ where: { id: id } });
    if (!artist) throw new NotFoundException('artist not found');
    else return artist;
  }

  async createArtist(dto: CreateArtistDto) {
    if (!(dto?.name && dto?.grammy)) {
      throw new BadRequestException('dto missing required fields');
    } else {
      const artistData = {
        id: uuidv4(),
        name: dto.name,
        grammy: dto.grammy,
      };
      return await prisma.artist.create({
        data: artistData,
      });
    }
  }

  async updateArtistById(id: string, dto: UpdateArtistDto) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    const artist = await prisma.artist.findFirst({ where: { id: id } });
    if (!artist) throw new NotFoundException('user not found');

    if (
      (!dto?.name && !dto?.grammy) ||
      (dto?.name && typeof dto?.name !== 'string') ||
      (dto?.grammy && typeof dto?.grammy !== 'boolean')
    )
      throw new BadRequestException('invalid dto');

    const newArtistData = {
      ...artist,
      name: dto.name,
      grammy: dto.grammy,
    };

    return await prisma.artist.update({
      where: {
        id: id,
      },
      data: newArtistData,
    });
  }

  async deleteArtistById(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    if (!(await prisma.artist.findFirst({ where: { id: id } })))
      throw new NotFoundException('artist not found');

    return await prisma.artist.delete({
      where: {
        id: id,
      },
    });
  }
}
