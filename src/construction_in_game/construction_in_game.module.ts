import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConstructionInGameController } from './controller/construction_in_game.controller';
import { RoomsModule } from 'src/rooms/rooms.module';
import { ConstructionInGameService } from './service/construction_in_game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionInGame } from './model/construction_in_game.model';
import { Construcao } from 'src/construcoes/model/construcao.model';
import { ConstructionInGameConsumer } from './job/constructions_in_game.consumer';

@Module({
    imports: [
        TypeOrmModule.forFeature([ConstructionInGame, Construcao]),
        BullModule.registerQueue({name: "building-queue"}),
        RoomsModule
    ],
    providers: [ConstructionInGameService, ConstructionInGameConsumer],
    controllers: [ConstructionInGameController]
})
export class ConstructionInGameModule {}
