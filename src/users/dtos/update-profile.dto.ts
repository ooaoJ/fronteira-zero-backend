import { IsEmail, IsInt, IsOptional, IsString, Max, Min, MinLength } from 'class-validator'

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  avatarId?: number
}