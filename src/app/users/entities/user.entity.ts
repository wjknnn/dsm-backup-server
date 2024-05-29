import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: string;

  @ApiProperty()
  @Column({ type: 'text' })
  name: string;

  // schoolName: string;

  @ApiProperty()
  @Column({ type: 'int8' })
  school_grade?: number;

  @ApiProperty()
  @Column({ type: 'text' })
  profile_image?: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  updated_at?: string;
}
