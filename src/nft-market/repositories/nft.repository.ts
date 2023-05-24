import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { clearConfigCache } from 'prettier';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Nft } from '../entities/nft.entity';

@Injectable()
export class NftRepository {
  constructor(
    @InjectRepository(Nft)
    private readonly nftRepository: Repository<Nft>
  ) {}

  async getAllComments(tokenId: number) {
    try {
      const nft = await this.nftRepository.find({ where: { token_id: tokenId } });
      return nft;
    } catch (error) {
      console.error(error, 'Failed get comments');
    }
  }

  async createComment(tokenId: number, content: string, userId: number) {
    try {
      const comment = await this.nftRepository.save(
        this.nftRepository.create({
          content,
          token_id: tokenId,
          user: userId
        })
      );
      return comment;
    } catch (error) {
      console.error(error, 'Failed wrote comment');
    }
  }
}
