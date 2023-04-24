import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  content: string;

  @ManyToOne(() => User, user => user.answer)
  @JoinColumn({ referencedColumnName: 'nickname' })
  user: User;

  @OneToOne(() => Question, question => question.id)
  @JoinColumn({ referencedColumnName: 'id' })
  question: Question;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
}
