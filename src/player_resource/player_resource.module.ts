import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerResource } from './model/player_resource.model';
import { PlayerResourceService } from './service/player_resource.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlayerResource])
    ],
    providers: [PlayerResourceService],
    exports: [PlayerResourceService]
})
export class PlayerResourceModule { }
