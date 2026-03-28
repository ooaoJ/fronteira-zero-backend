import { RoomPlayerStats } from '../model/room_player_stats.model';
import { PlayerStatus } from './room_player_stats.types';

export const ROOM_PLAYER_STATS_REPOSITORY = 'ROOM_PLAYER_STATS_REPOSITORY';

export type StatOperationData = {
    roomPlayerId: number;
    status: PlayerStatus;
    value: number;
};

export interface IRoomPlayerStatsRepository {
    findById(id: string): Promise<RoomPlayerStats | null>;
    increment(data: StatOperationData): Promise<void>;
    decrement(data: StatOperationData): Promise<void>;
}
