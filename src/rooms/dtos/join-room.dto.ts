import { IsEnum } from "class-validator";
import { RoomMode } from "../model/room.model";

export class JoinRoomDto {
    @IsEnum(RoomMode)
    mode: RoomMode
}