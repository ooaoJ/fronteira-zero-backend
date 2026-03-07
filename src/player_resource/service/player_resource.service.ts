import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PlayerResource } from '../model/player_resource.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ConstrucaoCustoResource } from 'src/construcao_custo_resource/model/construcao_custo_resource.model';

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

    async consumeResources(costs: ConstrucaoCustoResource[], playerID: number): Promise<void> {
        if (!costs || costs.length === 0) return;

        for (const cost of costs) {
            const hasEnough = await this.verifyAmount({
                resourceId: cost.resource.id,
                amount: cost.amount,
                playerID: playerID
            });

            if (!hasEnough) {
                throw new BadRequestException("Recurso insuficiente")
            }
        }

        for (const cost of costs) {
            await this.deductAmount({
                resourceId: cost.resource.id,
                amount: cost.amount,
                playerID: playerID
            });
        }
    }

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
    async deductAmount(data: verifyAmountData): Promise<void> {
        const playerResource = await this.playerResourceRepository.findOne({
            where: {
                roomPlayer: { id: data.playerID },
                resouerce: { id: data.resourceId }
            }
        })

        if (!playerResource) {
            throw new NotFoundException("Recurso nao encontrado")
        }

        playerResource.amount -= data.amount
        await this.playerResourceRepository.save(playerResource)
    }

}
