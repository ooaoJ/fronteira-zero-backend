import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class ChangePasswordDto {
  @IsString()
  @ApiProperty()
  currentPassword: string

  @IsString()
  @MinLength(6)
  @ApiProperty()
  newPassword: string
}