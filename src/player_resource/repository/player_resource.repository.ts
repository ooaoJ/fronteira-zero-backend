import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { PlayerResource } from "../model/player_resource.model";
import { InjectRepository } from "@nestjs/typeorm";

type verifyAmountData = {
    resourceId: string,
    amount: number,
    playerID: number
}

@Injectable()
export class PlayerResourceRepository {
    constructor (
        @InjectRepository(PlayerResource)
        private readonly playerResourceEntity: Repository<PlayerResource>
    ) {}

    async verifyAmount(data: verifyAmountData): Promise<PlayerResource | null> {
        const playerresource = await this.playerResourceEntity.findOne({
            where: {
                roomPlayer: { id: data.playerID},
                resouerce: { id: data.resourceId }, 
            }
        })

        return playerresource
    }
    
}