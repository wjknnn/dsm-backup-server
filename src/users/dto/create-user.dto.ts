import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// class SchoolDto {
//   @IsString()
//   schoolName: string;

//   @IsNumber()
//   grade: number;
// }

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  // @ValidateNested()
  // @IsOptional()
  // school?: SchoolDto;
  @ApiProperty()
  @IsOptional()
  grade?: number;

  @ApiProperty()
  @IsOptional()
  profileImage?: string;
}
