import { Repository } from "typeorm";
import { RoomPlayer } from "../model/room-player.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class RoomPlayerRepositoryCustom {
    constructor (
        @InjectRepository(RoomPlayer)
        private readonly roomPlayerRepository: Repository<RoomPlayer> 
    ) {}

    async isPlayerInRoom(userId: string, roomId: string): Promise<number>{
        const roomUser = await this.roomPlayerRepository.findOne({
            where: { userId, roomId }
        })

        if(!roomUser) {
            throw new NotFoundException("User nao encontrado na partida")
        }

        return roomUser?.id;
    }
}