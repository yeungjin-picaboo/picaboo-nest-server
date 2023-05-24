import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/common/custom-repository.module';
import { Nft } from 'src/nft-market/entities/nft.entity';
import { User } from './entities/user.entity';
import { UserRespository } from './repositories/user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Nft]),
    TypeOrmExModule.forCustomRepository([UserRespository])
  ],
  controllers: [UsersController],
  exports: [UsersService, UserRespository],
  providers: [UsersService, UserRespository]
})
export class UsersModule {}
