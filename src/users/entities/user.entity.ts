import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { Nft } from 'src/nft-market/entities/nft.entity';
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

  @OneToMany(() => Nft, nft => nft.user)
  nfts: Nft[];
}
