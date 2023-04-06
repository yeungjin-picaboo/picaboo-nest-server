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

  @Column({ nullable: true })
  @IsString()
  title: string;

  @Column({ nullable: true })
  @IsString()
  content: string;

  @Column({ nullable: true })
  @IsString()
  weather: string;

  @Column({ nullable: true })
  @IsString()
  year: number;

  @Column({ nullable: true })
  @IsString()
  month: number;

  @Column({ nullable: true })
  @IsString()
  emotion: string;

  @Column({ nullable: true })
  @IsString()
  source: string;

  @CreateDateColumn({ name: 'created_at', comment: '생성일' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', comment: '수정일' })
  updatedAt: Date;

  //관계
  @ManyToOne(() => User, user => user.email)
  user: User;
}
