import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class SchoolDto {
  @IsString()
  schoolName: string;

  @IsNumber()
  grade: number;
}

export class CreateUserDto {
  @IsString()
  name: string;

  @ValidateNested()
  @IsOptional()
  school?: SchoolDto;

  @IsOptional()
  profileImage?: string;
}
