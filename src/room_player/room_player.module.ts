import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/rooms/model/room.model';
import { RoomPlayer } from './model/room-player.model';
import { Resource } from 'src/resources/model/resource.model';
import { RoomPlayerRepositoryCustom } from './repository/room.player.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Room, RoomPlayer, Resource]),
    ],

    providers: [RoomPlayerRepositoryCustom],

    exports: [RoomPlayerRepositoryCustom]
})
export class RoomPlayerModule { }
