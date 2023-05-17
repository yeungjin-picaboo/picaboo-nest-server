import { Test, TestingModule } from '@nestjs/testing';
import { NftMarketService } from './nft-market.service';

describe('NftMarketService', () => {
  let service: NftMarketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftMarketService],
    }).compile();

    service = module.get<NftMarketService>(NftMarketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
