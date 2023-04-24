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
import { Answer } from './answer.entity';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  content: string;

  @Column()
  @IsBoolean()
  isPrivate: boolean;

  @ManyToOne(() => User, user => user.questions, { nullable: true })
  @JoinColumn({ referencedColumnName: 'nickname' })
  user: User;

  @OneToOne(() => Answer, answer => answer.id)
  @JoinColumn({ referencedColumnName: 'id' })
  answer: Answer;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
}
