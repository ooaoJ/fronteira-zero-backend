import { Controller, Param, Post, Req, UseGuards, Get } from '@nestjs/common';
import { ConstructionInGameService } from '../service/construction_in_game.service';
import { ConstructionInGame } from '../model/construction_in_game.model';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('construction-in-game')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('construction-in-game')
export class ConstructionInGameController {
    constructor(
        private readonly constructionInGameService: ConstructionInGameService
    ) { }

    @ApiOperation({ summary: 'Build a construction in a room' })
    @ApiResponse({ status: 201, description: 'The construction has been successfully started.', type: ConstructionInGame })
    @Post('/build/:constructionId/room/:roomId')
    async build(@Req() Req, @Param('constructionId') constuctionBluePrintID: string, @Param('roomId') roomId: string): Promise<object> {
        const constructionInGame = await this.constructionInGameService.build(Req.user, constuctionBluePrintID, roomId);

        return { message: "success building your construction" };
    }
    @ApiOperation({ summary: 'Find all constructions in a room for the current user' })
    @ApiResponse({ status: 200, description: 'Return all constructions in the room.', type: [ConstructionInGame] })
    @Get('/room/:roomId')
    async findAllConstructions(@Req() Req, @Param('roomId') roomId: string): Promise<ConstructionInGame[]> {
        return await this.constructionInGameService.findAllConstructions(Req.user.id, roomId);
    }
}
