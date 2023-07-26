import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate } from 'uuid';
import { UpdateUserDto } from './update-user.dto';
import { database } from 'src/database/database';
@Injectable()
export class UserService {
  getAll() {
    return database.users;
  }

  getUserById(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    const user = database.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  createUser(dto: CreateUserDto) {
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
    database.users.push(userData);
    delete userData.password;
    return userData;
  }

  updateUserById(id: string, dto: UpdateUserDto) {
    if (!validate(id)) throw new BadRequestException('invalid id');

    if (!(dto?.oldPassword && dto?.newPassword))
      throw new BadRequestException('invalid dto');

    const index = database.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('user not found');
    const user = database.users.find((user) => user.id === id);

    if (dto?.oldPassword !== user?.password)
      throw new ForbiddenException('wrong password');

    const newUserData = {
      ...user,
      password: dto.newPassword,
      updatedAt: Date.now(),
      version: (user.version += 1),
    };

    database.users[index] = newUserData;

    delete newUserData.password;
    return newUserData;
  }

  deleteUserById(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id');
    const index = database.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('user not found');

    try {
      database.users.splice(index, 1); //check
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
