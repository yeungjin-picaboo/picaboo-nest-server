import { Test, TestingModule } from '@nestjs/testing';
import { NftMarketController } from './nft-market.controller';

describe('NftMarketController', () => {
  let controller: NftMarketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftMarketController],
    }).compile();

    controller = module.get<NftMarketController>(NftMarketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
