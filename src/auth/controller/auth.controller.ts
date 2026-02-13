import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterDTO } from '../dtos/register.dto';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dtos/login.dto';
import { AccessToken } from '../interfaces/token.interface';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE')
        private readonly authService: AuthService
    ){}

    @Post('/register')
    async register(@Body() data: RegisterDTO){
        const user = await this.authService.register(data);

        return user;
    }

    @Post('/login')
    async login(@Body() data: LoginDTO): Promise<AccessToken>{
        const accessToken = this.authService.login(data);

        return accessToken;
    }
}
