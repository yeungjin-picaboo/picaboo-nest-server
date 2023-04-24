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

  @Column()
  @IsString()
  nickname: string;

  @Column({ nullable: true })
  @OneToOne(() => Answer, answer => answer.id)
  @IsNumber()
  answerId: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
}
