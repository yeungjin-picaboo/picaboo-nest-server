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
export class Nft extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  token_id: number; //게시판id

  @Column({ nullable: true })
  @IsString()
  content: string; //댓글내용

  @CreateDateColumn({ name: 'created_at', comment: '생성일' })
  @ApiProperty({ description: ' CreatedAt' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', comment: '수정일' })
  @ApiProperty({ description: ' UpdatedAt' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.nfts)
  user: number;
}
