import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './model/resource.model';

@Module({
    imports: [
        TypeOrmModule.forFeature([Resource])
    ]
})
export class ResourcesModule {}
