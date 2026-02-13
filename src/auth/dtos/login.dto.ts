import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDTO {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @MaxLength(10)
    @MinLength(8)
    password: string
    
}