import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoomPlayerStatsService } from '../service/room_player_stats.service';
import { AuthGuard } from '@nestjs/passport';
import { MyStats } from '../interface/room_player_stats.types';

@ApiTags('room-player-stats')
@ApiBearerAuth()
@Controller('room-player-stats')
@UseGuards(AuthGuard('jwt'))
export class RoomPlayerStatsController {
    constructor(
        private readonly roomPlayerStatsService: RoomPlayerStatsService
    ) { }

    @ApiOperation({ summary: "Visualizar status de player em uma determinada partida." })
    @Get('/myStats/:room')
    async myStats(@Req() req, @Param('room') roomId: string) {
        const data: MyStats = { user_id: req.user.id, room_id: roomId };

        return await this.roomPlayerStatsService.myStats(data);
    }
}
