import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomPlayerStats } from '../model/room_player_stats.model';
import type { CreateRoomPlayerStats, IRoomPlayerStatsRepository, StatOperationData } from '../interface/room_player_stats.repository.interface';
import { RoomPlayerRepositoryCustom } from 'src/room_player/repository/room.player.repository';
import { MyStats } from '../interface/room_player_stats.types';

@Injectable()
export class RoomPlayerStatsRepository implements IRoomPlayerStatsRepository {
    constructor(
        @InjectRepository(RoomPlayerStats)
        private readonly repository: Repository<RoomPlayerStats>,

        private readonly roomPlayerService: RoomPlayerRepositoryCustom
    ) { }

    async findById(id: string): Promise<RoomPlayerStats | null> {
        return this.repository.findOne({ where: { id } });
    }

    async increment(data: StatOperationData): Promise<void> {
        await this.repository.increment(
            { room_player: { id: data.roomPlayerId } },
            data.status,
            data.value
        );
    }

    async decrement(data: StatOperationData): Promise<void> {
        await this.repository.decrement(
            { room_player: { id: data.roomPlayerId } },
            data.status,
            data.value
        );
    }

    async create(data: CreateRoomPlayerStats): Promise<RoomPlayerStats> {
        const roomPlayerStats = await this.repository.create(data);
        await this.repository.save(roomPlayerStats);
        return roomPlayerStats
    }

    async myStats(data: MyStats): Promise<RoomPlayerStats | null> {
        const roomPlayer = await this.roomPlayerService.isPlayerInRoom(data.user_id, data.room_id);

        return await this.repository.findOne({ where: { room_player: { id: roomPlayer.id } } });
    }
}
