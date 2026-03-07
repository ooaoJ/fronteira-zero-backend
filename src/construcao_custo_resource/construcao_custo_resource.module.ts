import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstrucaoCustoResource } from './model/construcao_custo_resource.model';

@Module({
    imports: [
        TypeOrmModule.forFeature([ConstrucaoCustoResource])
    ],
    exports: [TypeOrmModule]
})
export class ConstrucaoCustoResourceModule {}
