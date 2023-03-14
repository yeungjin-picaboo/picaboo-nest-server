import { IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
<<<<<<< HEAD
  PrimaryGeneratedColumn
=======
  PrimaryGeneratedColumn,
>>>>>>> main
} from 'typeorm';

@Entity()
export class Diary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; //diaryId

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  content: string;

  @Column()
  @IsNumber()
  year: number;

  @Column()
  @IsNumber()
  month: string;

  @CreateDateColumn({ name: 'created_at', comment: '생성일' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', comment: '수정일' })
  updatedAt: Date;

  //관계
  @ManyToOne(() => User, user => user.id)
  user: User;
}
