import { Injectable } from "@nestjs/common";
import { BuffEffectStrategy } from "./strategyes/buff.strategy";
import { UpdatedStats } from "src/room_player_stats/interface/room_player_stats.types";

@Injectable()
export class EffectStrategySelector {
    constructor(
        private readonly buffStrategy: BuffEffectStrategy
    ) { }

    async selector(typeEfect: string, payload: UpdatedStats): Promise<any> {
        switch (typeEfect) {
            case 'buff':
                return this.buffStrategy.apply(payload);
                break;
        }
    }
}