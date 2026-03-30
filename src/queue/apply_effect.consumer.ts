import { Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import type { Job } from "bull";
import { Status } from "src/construction_in_game/model/construction_in_game.model";
import { EffectStrategySelector } from "src/effects/selector";
import { UpdatedStats } from "src/room_player_stats/interface/room_player_stats.types";

type SendUpdatedStats = {
    roomPlayerId: number,
    status: Status,
    value: number,
    type: string
}

@Injectable()
@Processor('updatedRoomPlayerStats-queue')
export class ApplyEffectConsumer {
    constructor(
        private readonly effectConstructionSelector: EffectStrategySelector,
    ) { }

    @Process('apply-effect')
    async applyEffect({ data }: Job<SendUpdatedStats>) {
        return await this.effectConstructionSelector.selector(data.type, data);
    }
}
