import { Module } from '@nestjs/common';
import { RoomPlayer } from 'src/rooms/model/room-player.model';

@Module({
    imports: [RoomPlayer]
})
export class ConstructionInGameModule {}
