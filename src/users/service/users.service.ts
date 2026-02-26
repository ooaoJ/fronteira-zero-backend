import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserInterface } from '../interfaces/user.interface';
import { User } from '../model/user.model';
import { UserServiceInterface } from '../interfaces/users.repository.interface';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService implements UserServiceInterface{
    async create(data: UserInterface){
        const user = new User();
        user.email = data.email;
        user.name = data.name;
        user.password = data.password

        await user.save()

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await User.findOneBy({email});

        return user;
    }

    async findById(id:string): Promise<User> {
        const user = await User.findOneBy({ id })
        if (!user) throw new NotFoundException('Usuário não encontrado')
        return user
    }
}
