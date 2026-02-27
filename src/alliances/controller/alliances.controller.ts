import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AlliancesService } from '../service/alliances.service';
import { CreateAllianceDto } from '../dtos/create-alliance.dto';
import { SendMessageDto } from '../dtos/send-message.dto';

@Controller('alliances')
@UseGuards(AuthGuard('jwt'))
export class AlliancesController {
  constructor(private readonly alliancesService: AlliancesService) {}

  @Get()
  list() {
    return this.alliancesService.listAlliances();
  }

  @Get('me')
  me(@Req() req: any) {
    return this.alliancesService.getMyAlliance(req.user.id);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateAllianceDto) {
    return this.alliancesService.createAlliance(req.user.id, dto);
  }

  @Post(':id/join')
  join(@Req() req: any, @Param('id') id: string) {
    return this.alliancesService.joinAlliance(req.user.id, id);
  }

  @Post('leave')
  leave(@Req() req: any) {
    return this.alliancesService.leaveAlliance(req.user.id);
  }

  @Post('me/messages')
  sendMessage(@Req() req: any, @Body() dto: SendMessageDto) {
    return this.alliancesService.sendMessage(req.user.id, dto);
  }
}