import { Controller, Get, Post, Query, Body, Req, UseGuards } from '@nestjs/common';
import { RoomsService } from '../service/rooms.service';
import { RoomMode } from '../model/room.model';
import { JoinRoomDto } from '../dtos/join-room.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('rooms')
@UseGuards(AuthGuard('jwt'))
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @Get()
    async listRooms(@Query('mode') mode: RoomMode) {
        return this.roomsService.listWaitingRooms(mode);
    }

    @Post('join')
    async joinRoom(@Req() req, @Body() body: JoinRoomDto) {
        const userId = req.user.id;
        return this.roomsService.joinRoom(userId, body.mode);
    }
}