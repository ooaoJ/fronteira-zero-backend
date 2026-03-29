import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PlayerResource } from '../model/player_resource.model';
import { ConstrucaoCustoResource } from 'src/construcao_custo_resource/model/construcao_custo_resource.model';
import {
    PLAYER_RESOURCE_REPOSITORY
} from '../interface/player_resource.repository.interface';
import type { IPlayerResourceRepository } from '../interface/player_resource.repository.interface';
import { CreateDataPlayerResource } from '../interface/player_resource.typess';

type verifyAmountData = {
    resourceId: string,
    amount: number,
    playerID: number
}

@Injectable()
export class PlayerResourceService {
    constructor(
        @Inject(PLAYER_RESOURCE_REPOSITORY)
        private readonly playerResourceRepository: IPlayerResourceRepository
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
        return;
    }

    async verifyAmount(data: verifyAmountData): Promise<boolean> {
        const playerResource = await this.playerResourceRepository.findByPlayerAndResource(
            data.playerID,
            data.resourceId
        );

        if (!playerResource) {
            throw new NotFoundException("Recurso nao encontrado")
        }

        return playerResource.amount >= data.amount;
    }

    async deductAmount(data: verifyAmountData): Promise<void> {
        const playerResource = await this.playerResourceRepository.findByPlayerAndResource(
            data.playerID,
            data.resourceId
        );

        if (!playerResource) {
            throw new NotFoundException("Recurso nao encontrado")
        }

        playerResource.amount -= data.amount;
        await this.playerResourceRepository.save(playerResource);
        return;
    }

    async createPlayerResource(data: CreateDataPlayerResource): Promise<PlayerResource> {
        return await this.playerResourceRepository.create(data);
    }
}
