import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerResource } from '../model/player_resource.model';
import type { IPlayerResourceRepository } from '../interface/player_resource.repository.interface';

@Injectable()
export class PlayerResourceRepository implements IPlayerResourceRepository {
    constructor(
        @InjectRepository(PlayerResource)
        private readonly repository: Repository<PlayerResource>
    ) { }

    async findByPlayerAndResource(playerId: number, resourceId: string): Promise<PlayerResource | null> {
        return this.repository.findOne({
            where: {
                roomPlayer: { id: playerId },
                resouerce: { id: resourceId }
            }
        });
    }

    async save(playerResource: PlayerResource): Promise<PlayerResource> {
        return this.repository.save(playerResource);
    }
}
