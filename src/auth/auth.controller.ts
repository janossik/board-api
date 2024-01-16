import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';
import { AuthService } from '~/auth/auth.service';
import { Response } from 'express';
import { Roles } from '~/roles/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard)
  @Roles(['admin'])
  @Post('signup')
  async signUp(@Body('email') email: string, @Body('password') password: string, @Body('permission') permission: number) {
    return this.authService.signUp(email, password, permission);
  }

  @Post('signin')
  async signIn(@Body('email') email: string, @Body('password') password: string, @Res() response: Response) {
    const result = await this.authService.signIn(email, password);
    response.cookie('access_token', result.access_token);
    response.send(result);
    return result;
  }
}
