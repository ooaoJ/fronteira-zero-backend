import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserInterface } from '../interfaces/user.interface';
import { Rank, User } from '../model/user.model';
import { UserServiceInterface } from '../interfaces/users.repository.interface';
import { NotFoundError } from 'rxjs';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService implements UserServiceInterface {
    async create(data: UserInterface) {
        const user = new User();
        user.email = data.email;
        user.name = data.name;
        user.password = data.password;
        user.rank = Rank.RECRUTA;
        user.wins = 0;
        user.hordesDefeated = 0

        await user.save()

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await User.findOneBy({ email });

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await User.findOneBy({ id })
        if (!user) throw new NotFoundException('Usuário não encontrado')
        return user
    }

    async getMe(userId: string) {
        const user = await User.findOneBy({ id: userId })
        if (!user) throw new NotFoundException('Usuário não encontrado')

        const { password, ...safe } = user
        return safe
    }

    async updateMe(userId: string, data: any) {
        const user = await User.findOneBy({ id: userId })
        if (!user) throw new NotFoundException('Usuário não encontrado')

        if (data.name !== undefined) {
            user.name = data.name.trim()
        }

        if (data.email !== undefined) {
            const existing = await User.findOneBy({ email: data.email })
            if (existing && existing.id !== userId) {
                throw new BadRequestException('Email já está em uso')
            }
            user.email = data.email.trim().toLowerCase()
        }

        if (data.avatarId !== undefined) {
            if (data.avatarId < 1 || data.avatarId > 5) {
                throw new BadRequestException('Avatar inválido')
            }
            user.avatarId = data.avatarId
        }

        await user.save()

        const { password, ...safe } = user
        return safe
    }

    async changePassword(userId: string, current: string, next: string) {
        const user = await User.findOneBy({ id: userId })
        if (!user) throw new NotFoundException('Usuário não encontrado')

        const ok = await bcrypt.compare(current, user.password)
        if (!ok) {
            throw new BadRequestException('Senha atual incorreta')
        }

        user.password = await bcrypt.hash(next, 10)
        await user.save()

        return { ok: true }
    }
}
