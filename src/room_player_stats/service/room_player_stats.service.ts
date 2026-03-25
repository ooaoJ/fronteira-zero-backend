import { Injectable, NotFoundException } from '@nestjs/common';
import { NumericType, Repository } from 'typeorm';
import { RoomPlayerStats } from '../model/room_player_stats.model';

enum playerStatus {
    DEF = 'def',
    ATK = 'atk',
    NOISE = 'noise'
}

type UpdatedStats = {
    roomPlayerId
    status: playerStatus,
    value: number
}

@Injectable()
export class RoomPlayerStatsService {
    constructor(
        private readonly roomPlayerStatsRepository: Repository<RoomPlayerStats>
    ) { }

    async getPlayerStats(roomPlayerStatsId: string): Promise<RoomPlayerStats> {
        const roomPlayerStats = await this.roomPlayerStatsRepository.findOne({
            where: { id: roomPlayerStatsId }
        });

        if (!roomPlayerStats) {
            throw new NotFoundException("Status do jogador nao encontrado");
        }

        return roomPlayerStats;
    }

    async incrementStatus(data: UpdatedStats): Promise<void> {
        await this.roomPlayerStatsRepository.increment(
            { room_player: { id: data.roomPlayerId } },
            data.status,
            data.value
        )
    }
}
