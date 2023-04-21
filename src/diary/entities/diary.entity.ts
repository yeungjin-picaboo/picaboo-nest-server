import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Diary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; //diaryId

  @Column()
  @ApiProperty({ description: 'Title' })
  @IsString()
  title: string;

  @Column()
  @ApiProperty({ description: 'Content' })
  @IsString()
  content: string;

  @Column({ nullable: true })
  @IsString()
  date: string;

  @Column({ nullable: true })
  @IsString()
  emotion: string;

  @Column({ nullable: true })
  @IsString()
  weather: string;

  @Column({ nullable: true })
  @IsString()
  source: string;

  @CreateDateColumn({ name: 'created_at', comment: '생성일' })
  @ApiProperty({ description: 'CreatedAt' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', comment: '수정일' })
  @ApiProperty({ description: 'UpdatedAt' })
  updatedAt: Date;

  //관계
  @ManyToOne(() => User, user => user.email)
  user: User;
}
