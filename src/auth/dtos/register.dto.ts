import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

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