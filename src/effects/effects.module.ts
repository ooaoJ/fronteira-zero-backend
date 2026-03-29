import { Module } from '@nestjs/common';
import { EffectStrategySelector } from './selector';
import { RoomPlayerStatsModule } from '../room_player_stats/room_player_stats.module';
import { BuffEffectStrategy } from './strategyes/buff.strategy';

@Module({

    imports: [RoomPlayerStatsModule],
    providers: [
        EffectStrategySelector,
        BuffEffectStrategy
    ],
    exports: [EffectStrategySelector]
})
export class EffectsModule { }
