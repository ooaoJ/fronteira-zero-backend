import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
    @ApiProperty({ description: 'The name of the user', maxLength: 100 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string

    @ApiProperty({ description: 'The email address of the user' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ description: 'The password of the user', minLength: 8, maxLength: 10 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(8)
    password: string
}

export interface registerResponse {
    id: string,
    email: string,
    name: string
}

export function registerResponse(data: registerResponse){
    return {
        id: data.id,
        name: data.name,
        email: data.email
    }
}