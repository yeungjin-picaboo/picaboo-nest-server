import { IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString()
  content: string;

  @Column({ nullable: false })
  @ManyToOne(() => User, user => user.nickname)
  @IsString()
  nickname: string;

  @Column({ nullable: false })
  @OneToOne(() => Question, question => question.id, {
    cascade: true
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  @IsNumber()
  questionId: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
}
