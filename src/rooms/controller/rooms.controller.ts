import { Controller, Get, Post, Query, Req, UseGuards, Param } from '@nestjs/common';
import { RoomsService } from '../service/rooms.service';
import { RoomMode } from '../model/room.model';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('rooms')
@ApiBearerAuth()
@Controller('rooms')
@UseGuards(AuthGuard('jwt'))
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @ApiOperation({ summary: 'List waiting rooms' })
  @ApiResponse({ status: 200, description: 'Return all waiting rooms for the given mode.' })
  @Get()
  async listRooms(@Query('mode') mode: RoomMode) {
    return this.roomsService.listWaitingRooms(mode)
  }

  @ApiOperation({ summary: 'List current user rooms' })
  @ApiResponse({ status: 200, description: 'Return all rooms the current user is in.' })
  @Get('me')
  async myRooms(@Req() req: any) {
    return this.roomsService.listMyRooms(req.user.id)
  }

  @ApiOperation({ summary: 'Join a specific room by ID' })
  @ApiResponse({ status: 201, description: 'The user has successfully joined the room.' })
  @Post(':roomId/join')
  async joinRoomById(@Req() req, @Param('roomId') roomId: string) {
    const userId = req.user.id;
    return this.roomsService.joinRoomByRoomId(userId, roomId);
  }
}