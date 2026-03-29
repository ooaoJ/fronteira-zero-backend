import { Resource } from "src/resources/model/resource.model"
import { RoomPlayer } from "src/rooms/model/room-player.model"

export type CreateDataPlayerResource = {
    resouerce: Resource,
    roomPlayer: RoomPlayer
}