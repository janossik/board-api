import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  it('should be defined', () => {
    const rolesGuard = new RolesGuard(new Reflector());
    expect(rolesGuard).toBeDefined();
  });
});
