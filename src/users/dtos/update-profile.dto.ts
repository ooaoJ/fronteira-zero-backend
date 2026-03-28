import { IsEmail, IsInt, IsOptional, IsString, Max, Min, MinLength } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateProfileDto {
  @ApiPropertyOptional({ description: 'The name of the user', minLength: 3 })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string

  @ApiPropertyOptional({ description: 'The email address of the user' })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiPropertyOptional({ description: 'The avatar ID of the user', minimum: 1, maximum: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  avatarId?: number
}