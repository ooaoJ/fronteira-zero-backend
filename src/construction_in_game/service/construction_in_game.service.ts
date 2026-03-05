import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ConstructionInGame } from "../model/construction_in_game.model";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/model/user.model";
import { Construcao } from "src/construcoes/model/construcao.model";

@Injectable()

export class ConstructionInGameService {
    constructor(
        @InjectRepository(ConstructionInGame)
        private readonly constructionInGameRepository: Repository<ConstructionInGame>,

        @InjectRepository(Construcao)
        private readonly constructionBluePrintRepository: Repository<Construcao>
    ) {}

    private async build(user: User, constructionId: string): Promise<ConstructionInGame> {
        const construct = await this.constructionBluePrintRepository.findOne({
            where: {
                id: constructionId
            }
        })

        if(!construct){
            throw new NotFoundException("Construcao nao encontrada")
        }

       const constructIngame = await this.constructionInGameRepository.save({
            constructionBluePrint: construct,
            roomPlayerId: user.id,
            current_life: construct.base_life,
            current_atk: construct.base_atk,
            current_def: construct.base_def
        });

        return constructIngame

    } 
}