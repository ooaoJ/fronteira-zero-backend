import { User } from "../model/user.model";
import { UserInterface } from "./user.interface";

interface LoginInterface{
    email: string,
    password: string
}

export interface UserServiceInterface {
    create(dados: UserInterface) : Promise<User>,
    findByEmail(email: string): Promise<User | null>;
}