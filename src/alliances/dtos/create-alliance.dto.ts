import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAllianceDto {
  @ApiProperty({ description: 'The name of the alliance', minLength: 3, maxLength: 60 })
  @IsString()
  @Length(3, 60)
  name: string;

  @ApiPropertyOptional({ description: 'The tag of the alliance', minLength: 2, maxLength: 8 })
  @IsOptional()
  @IsString()
  @Length(2, 8)
  tag?: string;
}