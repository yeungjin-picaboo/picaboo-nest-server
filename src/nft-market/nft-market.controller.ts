import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { Nft } from './entities/nft.entity';
import { NftMarketService } from './nft-market.service';

@Controller('api/nft-comment')
@ApiTags('Nft Market')
export class NftMarketController {
  constructor(private nftMarketService: NftMarketService) {}
  @UseGuards(AccessTokenGuard)
  @Get('')
  async getAllComment(@Body('token_id') tokenId: number): Promise<any> {
    return this.nftMarketService.getComments(tokenId);
  }

  @UseGuards(AccessTokenGuard)
  @Post('')
  async createComment(@Req() req: Request, @Body() requestBody) {
    return this.nftMarketService.saveComment(
      requestBody.token_id,
      requestBody.content,
      req.user['userId']
    );
  }
}
