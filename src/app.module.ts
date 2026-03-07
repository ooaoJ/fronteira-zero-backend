import { Inject, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from './rooms/rooms.module';
import { AlliancesModule } from './alliances/alliance.module'
import { ResourcesModule } from './resources/resources.module';
import { BullModule } from '@nestjs/bull'
import { ConstrucoesModule } from './construcoes/construcoes.module';
import { ConstructionInGameModule } from './construction_in_game/construction_in_game.module';
import { PlayerResourceModule } from './player_resource/player_resource.module';
import { ConstrucaoCustoResourceModule } from './construcao_custo_resource/construcao_custo_resource.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get("REDIS_HOST"),
          port: config.get("REDIS_PORT") || 6379, 
          password: config.get("REDIS_PASSWORD"), 
      },
        defaultJobOptions: {
          attempts: 3
        }
      })
    }),
    UsersModule, AuthModule, RoomsModule, AlliancesModule, ConfigModule.forRoot({
    isGlobal: true
  }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        username: config.getOrThrow('DATABASE_USERNAME'),
        password: config.getOrThrow('DATABASE_PASSWORD'),
        port: config.getOrThrow('DATABASE_PORT'),
        host: config.getOrThrow('DATABASE_HOST'),
        database: config.getOrThrow('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true
      })
    }),
    ResourcesModule,ConstrucoesModule, ConstructionInGameModule, PlayerResourceModule, ConstrucaoCustoResourceModule],
})
export class AppModule { }
