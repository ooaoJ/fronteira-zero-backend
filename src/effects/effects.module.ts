import { Module } from '@nestjs/common';
import { EffectStrategySelector } from './selector';
import { RoomPlayerStatsModule } from 'src/room_player_stats/room_player_stats.module';

@Module({
    providers: [
        EffectStrategySelector,
        RoomPlayerStatsModule
    ],
    exports: [EffectStrategySelector]
})
export class EffectsModule { }
