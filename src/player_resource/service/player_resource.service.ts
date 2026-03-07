import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PlayerResource } from '../model/player_resource.model';
import { InjectRepository } from '@nestjs/typeorm';

type verifyAmountData = {
    resourceId: string,
    amount: number,
    playerID: number
}


@Injectable()
export class PlayerResourceService {
    constructor(
        @InjectRepository(PlayerResource)
        private readonly playerResourceRepository: Repository<PlayerResource>
    ) { }

    async verifyAmount(data: verifyAmountData): Promise<boolean> {
        const playerResource = await this.playerResourceRepository.findOne({
            where: {
                roomPlayer: { id: data.playerID },
                resouerce: { id: data.resourceId }
            }
        })

        if (!playerResource) {
            throw new NotFoundException("Recurso nao encontrado")
        }

        return playerResource.amount >= data.amount
    }

}
