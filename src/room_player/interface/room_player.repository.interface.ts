import { RoomPlayer } from "../model/room-player.model";

export interface IRoomPlayerRepository {
    isPlayerInRoom(userId: string, roomId: string): Promise<RoomPlayer>
}