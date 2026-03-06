import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerResource } from './model/player_resource.model';
import { PlayerResourceRepository } from './repository/player_resource.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlayerResource])
    ],
    providers: [PlayerResourceRepository],
    exports: [PlayerResourceRepository]
})
export class PlayerResourceModule {}
