import { IsOptional, IsString, Length } from 'class-validator';

export class CreateAllianceDto {
  @IsString()
  @Length(3, 60)
  name: string;

  @IsOptional()
  @IsString()
  @Length(2, 8)
  tag?: string;
}