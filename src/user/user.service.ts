import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate } from 'uuid';
import { UpdateUserDto } from './update-user.dto';
const prisma = new PrismaClient();
@Injectable()
export class UserService {
  async getAll() {
    return await prisma.user.findMany();
  }

  async getUserById(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    if (!(await prisma.user.findFirst({ where: { id: id } })))
      throw new NotFoundException('user not found');
    console.log('testing reload');

    return await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  async createUser(dto: CreateUserDto) {
    if (!(dto.login && dto.password))
      throw new BadRequestException('invalid id');

    const userData = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Number(Date.now()),
      updatedAt: Number(Date.now()),
    };
    await prisma.user.create({
      data: userData,
    });
    delete userData.password;
    return userData;
  }

  async updateUserById(id: string, dto: UpdateUserDto) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    if (!(dto?.oldPassword && dto?.newPassword))
      throw new BadRequestException('invalid dto');

    const user = await prisma.user.findFirst({ where: { id: id } });
    if (!user) throw new NotFoundException('user not found');

    if (dto.oldPassword !== user.password)
      throw new ForbiddenException('wrong password');

    const newUserData = {
      ...user,
      password: dto.newPassword,
      updatedAt: Date.now(),
      version: (user.version += 1),
    };

    await prisma.user.update({
      where: {
        id: id,
      },
      data: newUserData,
    });

    delete newUserData.password;
    return newUserData;
  }

  async deleteUserById(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    if (!(await prisma.user.findFirst({ where: { id: id } })))
      throw new NotFoundException('user not found');

    return await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
