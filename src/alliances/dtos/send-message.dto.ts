import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ description: 'The content of the message', minLength: 1, maxLength: 400 })
  @IsString()
  @Length(1, 400)
  content: string;
}