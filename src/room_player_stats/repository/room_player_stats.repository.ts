import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomPlayerStats } from '../model/room_player_stats.model';
import type { IRoomPlayerStatsRepository, StatOperationData } from '../interface/room_player_stats.repository.interface';

@Injectable()
export class RoomPlayerStatsRepository implements IRoomPlayerStatsRepository {
    constructor(
        @InjectRepository(RoomPlayerStats)
        private readonly repository: Repository<RoomPlayerStats>
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
}
