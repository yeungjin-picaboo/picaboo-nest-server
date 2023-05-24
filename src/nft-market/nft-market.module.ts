import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/common/custom-repository.module';
import { Diary } from 'src/diary/entities/diary.entity';
import { User } from 'src/users/entities/user.entity';
import { Nft } from './entities/nft.entity';
import { NftMarketController } from './nft-market.controller';
import { NftMarketService } from './nft-market.service';
import { NftRepository } from './repositories/nft.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Nft])],
  providers: [NftMarketService, NftRepository],
  controllers: [NftMarketController]
  // exports: []
})
export class NftMarketModule {}
