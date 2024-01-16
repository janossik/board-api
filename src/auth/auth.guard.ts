import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { User } from '~/user/user.entity';
import { UserService } from '~/user/user.service';
import { IS_PUBLIC_KEY } from '~/utils/public.util';

type UserTwt = (JwtPayload & Pick<User, 'id' | 'email' | 'permission'>) | string | null;

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private reflector: Reflector,
  ) {}
  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization: string | undefined = request.headers['authorization'];
    const [type, token] = authorization ? authorization.split(' ') : [];
    return type === 'Bearer' ? token : undefined;
  }
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const result = jwt.decode(token) as UserTwt;

    if (typeof result === 'string' || !result) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.userService.findOne(result.id);
      jwt.verify(token, user.token);
      request['user'] = user;
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
