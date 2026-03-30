import { RoomPlayer } from 'src/room_player/model/room-player.model';
import { RoomPlayerStats } from '../model/room_player_stats.model';
import { MyStats, PlayerStatus } from './room_player_stats.types';

export const ROOM_PLAYER_STATS_REPOSITORY = 'ROOM_PLAYER_STATS_REPOSITORY';

export type StatOperationData = {
    roomPlayerId: number;
    status: PlayerStatus;
    value: number;
};

export type CreateRoomPlayerStats = {
    room_player: RoomPlayer;
    horders_faced?: number;
    def?: number;
    atk?: number;
    noise?: number;
}

export interface IRoomPlayerStatsRepository {
    findById(id: string): Promise<RoomPlayerStats | null>;
    increment(data: StatOperationData): Promise<void>;
    decrement(data: StatOperationData): Promise<void>;
    create(data: CreateRoomPlayerStats): Promise<RoomPlayerStats>;
    myStats(data: MyStats): Promise<RoomPlayerStats | null>
}
