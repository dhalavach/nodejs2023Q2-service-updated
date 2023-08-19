//src/auth/auth.controller.ts

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './decorator';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  @HttpCode(201)
  public async signup(@Body() dto) {
    return await this.authService.signup(dto);
  }
  @Public()
  @Post('/login')
  @HttpCode(200)
  public async login(@Body() dto) {
    return await this.authService.login(dto);
  }

  @Post('/refresh')
  @HttpCode(200)
  public async refresh(@Body() dto) {
    try {
      const user = await this.authService.refreshToken(dto.refreshToken);
      return await this.authService.setAndReturnTokens(user);
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.FORBIDDEN);
      }
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
