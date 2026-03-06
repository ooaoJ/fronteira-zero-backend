 import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { RoomsController } from './controller/rooms.controller';
import { RoomsService } from './service/rooms.service';

import { Room } from './model/room.model';
import { RoomPlayer } from './model/room-player.model';

import { RoomPlayerRepositoryCustom } from './repository/room.player.repository';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'queue-teste' }),
    TypeOrmModule.forFeature([Room, RoomPlayer]),
  ],
  controllers: [RoomsController],
  providers: [
    RoomsService, 
    RoomPlayerRepositoryCustom 
  ],
  exports: [
    RoomsService, 
    RoomPlayerRepositoryCustom 
  ],
})
export class RoomsModule {}