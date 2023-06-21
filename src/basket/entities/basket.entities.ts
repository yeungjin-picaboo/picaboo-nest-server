import { IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Basket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  source: string;

  @Column()
  @IsNumber()
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  userId: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsNumber()
  price: number;
}
