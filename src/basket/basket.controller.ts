import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BasketService } from './basket.service';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { Request } from 'express';
import { CreateBasket } from './dtos/create-basket.dto';

@Controller('api/basket')
export class BasketController {
  constructor(private basketService: BasketService) {}
  @UseGuards(AccessTokenGuard)
  @Get('/')
  async getAllBasket(@Req() req: Request) {
    return this.basketService.getAllBasket(req);
  }
  @UseGuards(AccessTokenGuard)
  @Post('/')
  async createBasket(@Req() req: Request, @Body() createBasket: CreateBasket) {
    return this.basketService.createBasket(req, createBasket);
  }
  @UseGuards(AccessTokenGuard)
  @Delete('/')
  async deleteBasket(@Req() req: Request, @Body() deleteBasket: number) {
    console.log(deleteBasket);
    return this.basketService.deleteBasket(req, deleteBasket);
  }
}
