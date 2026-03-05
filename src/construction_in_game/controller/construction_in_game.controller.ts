import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ConstructionInGameService } from '../service/construction_in_game.service';
import { ConstructionInGame } from '../model/construction_in_game.model';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('construction-in-game')
export class ConstructionInGameController {
    constructor (
        private readonly constructionInGameService: ConstructionInGameService
    ) {}

    @Post('/build/:constructionId/room/:roomId')
    async build(@Req() Req, @Param('constructionId') constuctionBluePrintID: string, @Param('roomId') roomId: string): Promise<ConstructionInGame> {
        const constructionInGame = await this.constructionInGameService.build(Req.user, constuctionBluePrintID, roomId);

        return constructionInGame
    }
}
