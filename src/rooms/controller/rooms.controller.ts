import { Controller, Get, Post, Query, Req, UseGuards, Param } from '@nestjs/common';
import { RoomsService } from '../service/rooms.service';
import { RoomMode } from '../model/room.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('rooms')
@UseGuards(AuthGuard('jwt'))
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @Get()
  async listRooms(@Query('mode') mode: RoomMode) {
    return this.roomsService.listWaitingRooms(mode)
  }

  @Get('me')
  async myRooms(@Req() req: any) {
    return this.roomsService.listMyRooms(req.user.id)
  }

  @Post(':roomId/join')
  async joinRoomById(@Req() req, @Param('roomId') roomId: string) {
    const userId = req.user.id;
    return this.roomsService.joinRoomByRoomId(userId, roomId);
  }
}