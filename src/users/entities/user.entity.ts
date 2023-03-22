import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // @Column({ unique: true })
  // @IsString()
  // nickname: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;
}
