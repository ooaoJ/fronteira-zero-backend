import { Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConstructionInGame, Status } from "../model/construction_in_game.model";
import type { Job } from "bull";

type SendBuildConsumer = {
    constructionInGameId: string,
    userId: string
}

@Injectable()
@Processor('building-queue')
export class ConstructionInGameConsumer{
    constructor (
        @InjectRepository(ConstructionInGame)
        private readonly constructionInGameRepository: Repository<ConstructionInGame>
    ) {}

    @Process('finalize-build')
    async notifyBuild({data}: Job<SendBuildConsumer>) {
        console.log("Pegue o JOB!!!!");
        this.constructionInGameRepository.update(
            { id: data.constructionInGameId },
            { status: Status.BUILT }
        )
    }
}