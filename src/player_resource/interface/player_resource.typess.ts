import { Resource } from "src/resources/model/resource.model"
import { RoomPlayer } from "src/room_player/model/room-player.model"

export type CreateDataPlayerResource = {
    resouerce: Resource,
    roomPlayer: RoomPlayer
}