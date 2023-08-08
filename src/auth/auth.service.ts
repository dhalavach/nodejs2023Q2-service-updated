import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByLogin(login);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    throw new UnauthorizedException('not authorized');
  }
  async login(user: any) {
    const payload = { login: user.login, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
