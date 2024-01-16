import { Reflector } from '@nestjs/core';
import { roles } from '~/roles/roles.util';

export const Roles = Reflector.createDecorator<(keyof typeof roles)[]>();
