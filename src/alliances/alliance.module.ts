import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlliancesController } from './controller/alliances.controller';
import { AlliancesService } from './service/alliances.service';
import { AlliancesGateway } from './gateway/alliances.gateway';

import { Alliance } from './model/alliance.model';
import { AllianceMember } from './model/alliance-member.model';
import { AllianceMessage } from './model/alliance-message.model';
import { User } from '../users/model/user.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alliance, AllianceMember, AllianceMessage, User]),
  ],
  controllers: [AlliancesController],
  providers: [AlliancesService, AlliancesGateway],
  exports: [AlliancesService],
})
export class AlliancesModule {}