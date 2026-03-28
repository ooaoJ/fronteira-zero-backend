import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RoomPlayerStats } from '../model/room_player_stats.model';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { Construcao } from 'src/construcoes/model/construcao.model';
import {
    ROOM_PLAYER_STATS_REPOSITORY
} from '../interface/room_player_stats.repository.interface';

import type { IRoomPlayerStatsRepository } from '../interface/room_player_stats.repository.interface';
import type { UpdatedStats } from '../interface/room_player_stats.types';

@Injectable()
export class RoomPlayerStatsService {
    constructor(
        @Inject(ROOM_PLAYER_STATS_REPOSITORY)
        private readonly roomPlayerStatsRepository: IRoomPlayerStatsRepository,

        @InjectQueue("updatedRoomPlayerStats-queue")
        private readonly updatedRoomPlayerStatsQueue: Queue
    ) { }

    async getPlayerStats(roomPlayerStatsId: string): Promise<RoomPlayerStats> {
        const roomPlayerStats = await this.roomPlayerStatsRepository.findById(roomPlayerStatsId);

        if (!roomPlayerStats) {
            throw new NotFoundException("Status do jogador nao encontrado");
        }

        return roomPlayerStats;
    }

    async incrementStatus(data: UpdatedStats): Promise<void> {
        await this.roomPlayerStatsRepository.increment({
            roomPlayerId: data.roomPlayerId,
            status: data.status,
            value: data.value
        });
    }

    async decrementStatus(data: UpdatedStats): Promise<void> {
        await this.roomPlayerStatsRepository.decrement({
            roomPlayerId: data.roomPlayerId,
            status: data.status,
            value: data.value
        });
    }

    async dispatchUpdatedStats(construct: Construcao, roomPlayerId: number): Promise<void> {
        for (const efect of construct.efects) {
            await this.updatedRoomPlayerStatsQueue.add({
                data: {
                    roomPlayerId,
                    status: efect.status,
                    value: efect.value,
                    type: efect.type_efect
                }
            });
        }
    }
}
