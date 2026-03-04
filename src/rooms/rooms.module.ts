import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RoomsController } from './controller/rooms.controller'
import { RoomsService } from './service/rooms.service'

import { Room } from './model/room.model'
import { RoomPlayer } from './model/room-player.model'
import { BullModule } from '@nestjs/bull'

@Module({
    imports: [
        BullModule.registerQueue({name: "queue-teste"}),
        TypeOrmModule.forFeature([Room, RoomPlayer]),
    ],
    controllers: [RoomsController],
    providers: [RoomsService],
    exports: [RoomsService, RoomPlayer],
})
export class RoomsModule { }