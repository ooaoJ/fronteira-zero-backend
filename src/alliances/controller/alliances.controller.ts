import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AlliancesService } from '../service/alliances.service';
import { CreateAllianceDto } from '../dtos/create-alliance.dto';
import { SendMessageDto } from '../dtos/send-message.dto';

@ApiTags('alliances')
@ApiBearerAuth()
@Controller('alliances')
@UseGuards(AuthGuard('jwt'))
export class AlliancesController {
  constructor(private readonly alliancesService: AlliancesService) {}

  @ApiOperation({ summary: 'List all alliances' })
  @ApiResponse({ status: 200, description: 'Return all alliances.' })
  @Get()
  list() {
    return this.alliancesService.listAlliances();
  }

  @ApiOperation({ summary: 'Get current user alliance' })
  @ApiResponse({ status: 200, description: 'Return current user alliance.' })
  @Get('me')
  me(@Req() req: any) {
    return this.alliancesService.getMyAlliance(req.user.id);
  }

  @ApiOperation({ summary: 'Create a new alliance' })
  @ApiResponse({ status: 201, description: 'The alliance has been successfully created.' })
  @Post()
  create(@Req() req: any, @Body() dto: CreateAllianceDto) {
    return this.alliancesService.createAlliance(req.user.id, dto);
  }

  @ApiOperation({ summary: 'Join an alliance' })
  @ApiResponse({ status: 201, description: 'The user has successfully joined the alliance.' })
  @Post(':id/join')
  join(@Req() req: any, @Param('id') id: string) {
    return this.alliancesService.joinAlliance(req.user.id, id);
  }

  @ApiOperation({ summary: 'Leave the current alliance' })
  @ApiResponse({ status: 201, description: 'The user has successfully left the alliance.' })
  @Post('leave')
  leave(@Req() req: any) {
    return this.alliancesService.leaveAlliance(req.user.id);
  }

  @ApiOperation({ summary: 'Send a message in the current alliance chat' })
  @ApiResponse({ status: 201, description: 'The message has been successfully sent.' })
  @Post('me/messages')
  sendMessage(@Req() req: any, @Body() dto: SendMessageDto) {
    return this.alliancesService.sendMessage(req.user.id, dto);
  }
}