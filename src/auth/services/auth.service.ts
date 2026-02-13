import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import type { HashInterface } from 'src/auth/interfaces/hash.interface';
import { UserInterface } from 'src/users/interfaces/user.interface';
import type { UserServiceInterface } from 'src/users/interfaces/users.repository.interface';
import { registerResponse } from '../dtos/register.dto';
import type { AccessToken, TokenAuthInterface } from '../interfaces/token.interface';
import { AuthServiceInterface, login } from '../interfaces/auth.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface{

    constructor(
        @Inject('HASH')
        private readonly hashService: HashInterface,
        @Inject('USER_SERVICE')
        private readonly userService: UserServiceInterface,
        @Inject('TOKEN_SERVICE')
        private readonly jwtToken: TokenAuthInterface
    ) {}

    async login(data: login): Promise<AccessToken>{
        const user = await this.userService.findByEmail(data.email);

        if(!user){
            throw new NotFoundException("email nao cadastrado.")
        }

        const verify = await this.hashService.compare({password: data.password, userPassword: user.password})

        if(!verify){
            throw new UnauthorizedException("credeciais invalidas");
        }

        const payload = { sub: user.id, email: user.email }

        const accessToken = await this.jwtToken.sign(payload);

        return {accessToken: accessToken}
    }

    async register(data: UserInterface){
        const hashPassword = await this.hashService.create(data.password);
        const userExist = await this.userService.findByEmail(data.email);

        if(userExist != null){
            throw new ConflictException("Email ja cadastrado");
        }

        const user = await this.userService.create({...data, password: hashPassword});
        const response = registerResponse(user)

        return response;
    }
}
