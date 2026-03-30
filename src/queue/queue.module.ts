import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionInGame } from '../construction_in_game/model/construction_in_game.model';
import { ConstructionInGameConsumer } from './constructions_in_game.consumer';
import { ApplyEffectConsumer } from './apply_effect.consumer';
import { EffectsModule } from '../effects/effects.module';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        TypeOrmModule.forFeature([ConstructionInGame]),
        BullModule.registerQueue({ name: "building-queue" }),
        BullModule.registerQueue({ name: "updatedRoomPlayerStats-queue" }),
        EffectsModule
    ],
    providers: [ConstructionInGameConsumer, ApplyEffectConsumer],
    exports: [ConstructionInGameConsumer, ApplyEffectConsumer]
})
export class QueueModule { }
