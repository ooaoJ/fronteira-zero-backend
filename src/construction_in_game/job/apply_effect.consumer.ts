import { Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import type { Job } from "bull";
import { EffectStrategySelector } from "src/effects/selector";
import { UpdatedStats } from "src/room_player_stats/interface/room_player_stats.types";

type SendUpdatedStats = UpdatedStats & {
    effectType: string
}

@Injectable()
@Processor('updatedRoomPlayerStats-queue')
export class ApplyEffectConsumer {
    constructor(
        private readonly effectConstructionSelector: EffectStrategySelector
    ) { }

    @Process('apply-effect')
    async applyEffect({ data }: Job<SendUpdatedStats>) {
        return await this.effectConstructionSelector.selector(data.effectType, data);
    }
}