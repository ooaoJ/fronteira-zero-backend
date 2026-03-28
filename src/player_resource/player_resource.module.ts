import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerResource } from './model/player_resource.model';
import { PlayerResourceService } from './service/player_resource.service';
import { PlayerResourceRepository } from './repository/player_resource.repository';
import { PLAYER_RESOURCE_REPOSITORY } from './interface/player_resource.repository.interface';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlayerResource])
    ],
    providers: [
        PlayerResourceRepository,
        {
            provide: PLAYER_RESOURCE_REPOSITORY,
            useClass: PlayerResourceRepository,
        },
        PlayerResourceService,
    ],
    exports: [PlayerResourceService]
})
export class PlayerResourceModule { }
