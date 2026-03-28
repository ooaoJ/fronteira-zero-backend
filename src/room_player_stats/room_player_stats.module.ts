import { Module } from '@nestjs/common';
import { RoomPlayerStatsService } from './service/room_player_stats.service';
import { RoomPlayerStatsController } from './controller/room_player_stats.controller';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomPlayerStats } from './model/room_player_stats.model';
import { RoomPlayerStatsRepository } from './repository/room_player_stats.repository';
import { ROOM_PLAYER_STATS_REPOSITORY } from './interface/room_player_stats.repository.interface';
import { EffectsModule } from 'src/effects/effects.module';

@Module({
    imports: [
        BullModule.registerQueue({ name: "updatedRoomPlayerStats-queue" }),
        TypeOrmModule.forFeature([RoomPlayerStats]),
        EffectsModule
    ],
    providers: [
        RoomPlayerStatsService,
        RoomPlayerStatsRepository,
        {
            provide: ROOM_PLAYER_STATS_REPOSITORY,
            useClass: RoomPlayerStatsRepository,
        },
    ],
    controllers: [RoomPlayerStatsController],
    exports: [RoomPlayerStatsService]
})
export class RoomPlayerStatsModule { }
