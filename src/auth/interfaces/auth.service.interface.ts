import { UserInterface } from "src/users/interfaces/user.interface";
import { registerResponse } from "../dtos/register.dto";
import { AccessToken } from "./token.interface";

export interface login {
    email: string,
    password: string
}

export interface AuthServiceInterface { 
    login(data: login): Promise<AccessToken>,
    register(data: UserInterface): Promise<registerResponse>
}