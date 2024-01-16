import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '~/roles/roles.decorator';
import { roles as rolesEnum } from '~/roles/roles.util';
import { User } from '~/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as Pick<User, 'id' | 'email' | 'permission'>;

    return this.matchRoles(roles, user.permission);
  }

  private matchRoles(roles: (keyof typeof rolesEnum)[], permission: number) {
    for (const role of roles) {
      const allowPermission = rolesEnum[role];
      if (permission >= allowPermission) {
        return true;
      }
    }

    return false;
  }
}
