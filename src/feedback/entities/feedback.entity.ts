import { ApiProperty } from '@nestjs/swagger';

export class Feedback {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  explanation?: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  content?: string;

  @ApiProperty()
  tags?: string[];

  @ApiProperty()
  status?: '피드백 요청' | '논의중' | '해결됨';

  @ApiProperty()
  writer: string;

  @ApiProperty()
  feedback?: number;

  @ApiProperty()
  created_at: string;
}
