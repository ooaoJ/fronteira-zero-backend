import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersService } from 'src/users/service/users.service';
import { UsersModule } from 'src/users/users.module';
import { BcriptHash } from './services/bcript.service';
import { JwtAuthService } from './services/jwt.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
       UsersModule, 
       PassportModule,
       JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
            secret: config.getOrThrow('JWT_SECRET_KEY'),
            signOptions: { expiresIn: `${config.getOrThrow('JWT_EXPIRATION_TIME')}m` }
        })
       })
    ],
    providers: [
        AuthService,
        JwtStrategy,
        UsersService,
        {
            provide: 'USER_SERVICE',
            useClass: UsersService
        },
        {
            provide: 'HASH',
            useClass: BcriptHash
        },
        {
            provide: 'TOKEN_SERVICE',
            useClass: JwtAuthService
        },
        {
            provide: 'AUTH_SERVICE',
            useClass: AuthService
        }
    ],
    controllers: [AuthController]


})
export class AuthModule {
    
}
