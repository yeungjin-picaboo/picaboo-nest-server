import { Module } from '@nestjs/common';
import { NftMarketService } from './nft-market.service';

@Module({
  providers: [NftMarketService]
})
export class NftMarketModule {}
