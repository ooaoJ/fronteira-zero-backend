import { Module } from '@nestjs/common';
import { RoomPlayerStatsService } from './service/room_player_stats.service';
import { RoomPlayerStatsController } from './controller/room_player_stats.controller';

@Module({
    providers: [RoomPlayerStatsService],
    controllers: [RoomPlayerStatsController]
})
export class RoomPlayerStatsModule { }
