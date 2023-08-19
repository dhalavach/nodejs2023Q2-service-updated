//src/auth/auth.service.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User, tokensObject } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async setAndReturnTokens(user: User): Promise<tokensObject> {
    const payload = { sub: user.id, username: user.login };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: '12345',
      expiresIn: 600,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: '12345',
      expiresIn: 6000,
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userService.updateRefreshTokenById(user.id, hashedRefreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  public async refreshToken(refreshToken: string) {
    const payload = this.jwtService.decode(refreshToken);
    if (!payload) {
      throw new ForbiddenException('forbidden - no payload');
    }
    const user = await this.userService.getUserById(payload.sub);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    // if (!(await bcrypt.compare(refreshToken, user.refreshToken))) {
    //   throw new Error('invalid token');
    // }

    try {
      await this.jwtService.verifyAsync(refreshToken, { secret: '12345' });
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('forbidden');
    }
    return user;
  }

  public async signup(dto) {
    return await this.userService.createUser(dto);
  }

  public async login(dto): Promise<AuthEntity> {
    const { login, password } = dto;
    const user = await this.userService.getUserByLogin(login);
    // const user = await this.prisma.user.findFirst({ where: { login: login } });

    if (!user) {
      throw new NotFoundException(`No user found`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const tokens = await this.setAndReturnTokens(user);
    return tokens;
  }
}
