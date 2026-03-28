import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
    @ApiProperty({ description: 'The email address of the user' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ description: 'The password of the user', minLength: 8, maxLength: 10 })
    @IsString()
    @MaxLength(10)
    @MinLength(8)
    password: string
}