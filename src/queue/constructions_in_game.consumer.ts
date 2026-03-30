import { Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConstructionInGame, Status } from "../construction_in_game/model/construction_in_game.model";
import type { Job } from "bull";
import { RoomPlayerStatsService } from "src/room_player_stats/service/room_player_stats.service";
import { Construcao } from "src/construcoes/model/construcao.model";

type SendBuildConsumer = {
    constructionInGameId: string,
    roomPlayerId: number,
    construct: Construcao
}

@Injectable()
@Processor('building-queue')
export class ConstructionInGameConsumer {
    constructor(
        @InjectRepository(ConstructionInGame)
        private readonly constructionInGameRepository: Repository<ConstructionInGame>,

        private readonly roomPlayerStatsService: RoomPlayerStatsService
    ) { }

    @Process('finalize-build')
    async notifyBuild({ data }: Job<SendBuildConsumer>): Promise<void> {
        this.constructionInGameRepository.update(
            { id: data.constructionInGameId },
            { status: Status.BUILT }
        )

        this.roomPlayerStatsService.dispatchUpdatedStats(data.construct, data.roomPlayerId);

        return;
    }
}
