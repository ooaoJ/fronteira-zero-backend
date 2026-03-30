import { Module } from '@nestjs/common';
import { RoomPlayerStatsService } from './service/room_player_stats.service';
import { RoomPlayerStatsController } from './controller/room_player_stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomPlayerStats } from './model/room_player_stats.model';
import { RoomPlayerStatsRepository } from './repository/room_player_stats.repository';
import { ROOM_PLAYER_STATS_REPOSITORY } from './interface/room_player_stats.repository.interface';
import { BullModule } from '@nestjs/bull';
import { RoomsModule } from 'src/rooms/rooms.module';
import { RoomPlayerModule } from 'src/room_player/room_player.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RoomPlayerStats]),
        BullModule.registerQueue({ name: "updatedRoomPlayerStats-queue" }),
        RoomPlayerModule
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
