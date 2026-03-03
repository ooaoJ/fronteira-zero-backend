import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Construcao } from './model/construcao.model';

@Module({
    imports: [
        TypeOrmModule.forFeature([Construcao])
    ]
})
export class ConstrucoesModule {}
