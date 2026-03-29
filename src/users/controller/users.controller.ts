import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../service/users.service'
import { UpdateProfileDto } from '../dtos/update-profile.dto'
import { ChangePasswordDto } from '../dtos/change-password.dto'

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Return current user profile.' })
  @Get('me')
  async me(@Req() req: any) {
    return this.usersService.getMe(req.user.id)
  }

  // @ApiOperation({ summary: 'Update current user profile' })
  // @ApiResponse({ status: 200, description: 'The user profile has been successfully updated.' })
  // @Patch('me')
  // async updateMe(@Req() req: any, @Body() dto: UpdateProfileDto) {
  //   return this.usersService.updateMe(req.user.id, dto)
  // }

  // @ApiOperation({ summary: 'Change current user password' })
  // @ApiResponse({ status: 200, description: 'The user password has been successfully changed.' })
  // @Patch('me/password')
  // async changePassword(@Req() req: any, @Body() dto: ChangePasswordDto) {
  //   return this.usersService.changePassword(req.user.id, dto.currentPassword, dto.newPassword)
  // }
}