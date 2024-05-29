import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Feedback {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'int8' })
  id?: string;

  @ApiProperty()
  @Column({ type: 'text' })
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  explanation?: string;

  @ApiProperty()
  @Column({ type: 'text' })
  image?: string;

  @ApiProperty()
  @Column({ type: 'text' })
  content?: string;

  @ApiProperty()
  @Column({ type: 'text', array: true })
  tags?: string[];

  @ApiProperty()
  @Column({ type: 'text' })
  status?: '피드백 요청' | '논의중' | '해결됨';

  @ApiProperty()
  @Column({ type: 'uuid' })
  writer: string;

  @ApiProperty()
  @Column({ type: 'int8' })
  feedback?: number;

  @ApiProperty()
  @Column({ type: 'timestamptz' })
  created_at: string;
}
