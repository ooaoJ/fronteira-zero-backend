import { RoomPlayerStatsService } from "src/room_player_stats/service/room_player_stats.service";
import { IConstructionStrategy } from "../interface/construction.strategy.interface";
import { UpdatedStats } from "src/room_player_stats/interface/room_player_stats.types";




export class BuffEffectStrategy implements IConstructionStrategy {
    constructor(
        private readonly roomPlayerStatsService: RoomPlayerStatsService
    ) { }

    async apply(payload: UpdatedStats): Promise<void> {
        return this.roomPlayerStatsService.incrementStatus(payload);
    }
}