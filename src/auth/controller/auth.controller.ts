import { Body, Controller, Inject, Post, UseGuards, Get, Req } from '@nestjs/common'
import { RegisterDTO } from '../dtos/register.dto'
import { LoginDTO } from '../dtos/login.dto'
import { AccessToken } from '../interfaces/token.interface'
import type { AuthServiceInterface } from '../interfaces/auth.service.interface'

import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthServiceInterface,
  ) {}

  @Post('/register')
  async register(@Body() data: RegisterDTO) {
    return this.authService.register(data)
  }

  @Post('/login')
  async login(@Body() data: LoginDTO): Promise<AccessToken> {
    return this.authService.login(data)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() req: any) {
    return req.user
  }
}