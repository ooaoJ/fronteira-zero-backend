import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ConstructionInGame } from "../model/construction_in_game.model";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/model/user.model";
import { Construcao } from "src/construcoes/model/construcao.model";
import { InjectQueue } from "@nestjs/bull";
import type { Queue } from "bull";
import { RoomPlayer } from "src/rooms/model/room-player.model";
import { RoomPlayerRepositoryCustom } from "src/rooms/repository/room.player.repository";
import { PlayerResourceService } from "src/player_resource/service/player_resource.service";

@Injectable()
export class ConstructionInGameService {
    constructor(
        @InjectRepository(ConstructionInGame)
        private readonly constructionInGameRepository: Repository<ConstructionInGame>,

        @InjectRepository(Construcao)
        private readonly constructionBluePrintRepository: Repository<Construcao>,

        private readonly roomUserRepository: RoomPlayerRepositoryCustom,

        private readonly playerResourceService: PlayerResourceService,

        @InjectQueue("building-queue")
        private readonly buildingQueue: Queue
    ) { }

    async build(user: User, constructionId: string, roomId: string): Promise<ConstructionInGame> {
        const construct = await this.constructionBluePrintRepository.findOne({
            where: {
                id: constructionId
            },
            relations: ['costs', 'costs.resource']
        })

        if (!construct) {
            throw new NotFoundException("Construcao nao encontrada")
        }

        const roomPlayerId: number = await this.roomUserRepository.isPlayerInRoom(user.id, roomId)

        if (construct.costs && construct.costs.length > 0) {
            await this.playerResourceService.consumeResources(construct.costs, roomPlayerId);
        }

        const constructIngame = await this.constructionInGameRepository.save({
            constructionBluePrint: construct,
            roomPlayer: { id: roomPlayerId },
            current_life: construct.base_life,
            current_atk: construct.base_atk,
            current_def: construct.base_def
        });

        this.buildingQueue.add('finalize-build',
            {
                constructionInGameId: constructIngame.id,
                userId: user.id
            },
            {
                delay: construct.construction_time
            }
        );

        return constructIngame;
    }

    async findAllConstructions(userId: string, roomId: string): Promise<ConstructionInGame[]> {
        const roomPlayerId: number = await this.roomUserRepository.isPlayerInRoom(userId, roomId);

        return await this.constructionInGameRepository.find({
            where: {
                roomPlayer: { id: roomPlayerId }
            },
            relations: ['constructionBluePrint']
        });
    }
}