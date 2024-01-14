import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { UserService } from '~/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}
  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization: string | undefined = request.headers['authorization'];
    const [type, token] = authorization ? authorization.split(' ') : [];
    return type === 'Bearer' ? token : undefined;
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const result = jwt.decode(token) as
      | (JwtPayload & {
          id: number;
          email: string;
          permission: number;
        })
      | string
      | null;
    if (typeof result === 'string' || !result) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(result.id);
    try {
      jwt.verify(token, user.token);
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
