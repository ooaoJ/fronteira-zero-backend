import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RoomsController } from './controller/rooms.controller'
import { RoomsService } from './service/rooms.service'

import { Room } from './model/room.model'
import { RoomPlayer } from './model/room-player.model'

@Module({
    imports: [
        TypeOrmModule.forFeature([Room, RoomPlayer]),
    ],
    controllers: [RoomsController],
    providers: [RoomsService],
    exports: [RoomsService],
})
export class RoomsModule { }