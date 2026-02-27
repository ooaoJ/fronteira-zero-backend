import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UsersService } from '../service/users.service'
import { UpdateProfileDto } from '../dtos/update-profile.dto'
import { ChangePasswordDto } from '../dtos/change-password.dto'

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async me(@Req() req: any) {
    return this.usersService.getMe(req.user.id)
  }

  @Patch('me')
  async updateMe(@Req() req: any, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateMe(req.user.id, dto)
  }

  @Patch('me/password')
  async changePassword(@Req() req: any, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(req.user.id, dto.currentPassword, dto.newPassword)
  }
}