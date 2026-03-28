import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('room-player-stats')
@ApiBearerAuth()
@Controller('room-player-stats')
export class RoomPlayerStatsController {}
