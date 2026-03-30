import { Body, Controller, Inject, Post, UseGuards, Get, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from '../dtos/register.dto'
import { LoginDTO } from '../dtos/login.dto'
import { AccessToken } from '../interfaces/token.interface'
import type { AuthServiceInterface } from '../interfaces/auth.service.interface'

import { AuthGuard } from '@nestjs/passport'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthServiceInterface,
  ) { }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.' })
  @Post('/register')
  async register(@Body() data: RegisterDTO) {
    return this.authService.register(data)
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully logged in.', type: Object })
  @Post('/login')
  async login(@Body() data: LoginDTO): Promise<AccessToken> {
    return this.authService.login(data)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({ status: 200, description: 'Return current user information.' })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() req: any) {
    return req.user
  }
}