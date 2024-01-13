import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '~/user/user.entity';
import { UserService } from '~/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  private async validateUser(email: string, password: string): Promise<Omit<User, 'password' | 'tasks'>> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, tasks, ...rest } = user;
      return rest;
    }
    throw new UnauthorizedException();
  }

  async signUp(email: string, password: string, permission?: number): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userService.create(email, hashedPassword, permission);
  }

  async signIn(email: string, password: string): Promise<any> {
    const { token, ...user } = await this.validateUser(email, password);
    return jwt.sign(user, token, {
      expiresIn: '3h',
    });
  }
}
