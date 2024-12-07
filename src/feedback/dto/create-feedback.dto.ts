import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
