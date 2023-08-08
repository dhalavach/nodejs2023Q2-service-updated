import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getAll() {
    return this.UserService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUserById(@Param('id') id: string) {
    return this.UserService.getUserById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  createUser(@Body() dto: CreateUserDto) {
    return this.UserService.createUser(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.UserService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(204)
  deleteUserById(@Param('id') id: string) {
    return this.UserService.deleteUserById(id);
  }
}
