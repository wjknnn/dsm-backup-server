import { ApiProperty } from '@nestjs/swagger';

export class Users {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  // schoolName: string;

  @ApiProperty()
  school_grade?: number;

  @ApiProperty()
  profile_image?: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at?: string;
}
