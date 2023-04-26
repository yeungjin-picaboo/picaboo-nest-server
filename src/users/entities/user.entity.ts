import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { Answer } from 'src/qna/entities/answer.entity';
import { Question } from 'src/qna/entities/question.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; //userId

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ unique: true, nullable: true })
  @IsString()
  nickname: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @OneToMany(() => Question, question => question.nickname, {
    cascade: true
  })
  questions: Question[];

  @OneToMany(() => Answer, answer => answer.nickname, {
    cascade: true
  })
  answers: Answer[];
}
