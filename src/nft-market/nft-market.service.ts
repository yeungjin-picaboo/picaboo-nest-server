import { Injectable } from '@nestjs/common';
import { NftRepository } from './repositories/nft.repository';

@Injectable()
export class NftMarketService {
  constructor(private readonly nftRepository: NftRepository) {}

  async getComments(tokenId: number) {
    try {
      return await this.nftRepository.getAllComments(tokenId);
    } catch (error) {
      console.error(error);
    }
  }

  async saveComment(tokenId, content, userId) {
    try {
      console.log('create Comment service');
      console.log(tokenId);
      console.log(content);
      console.log(userId);
      return await this.nftRepository.createComment(tokenId, content, userId);
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  }
}
