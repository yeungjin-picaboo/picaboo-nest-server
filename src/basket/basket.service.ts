import { Injectable } from '@nestjs/common';
import { BasketRepository } from './repositories/basket.repository';
import { Basket } from './entities/basket.entities';
import { Request } from 'express';
import { CoreOutput } from 'src/common/dto/output.dto';
import { CreateBasket } from './dtos/create-basket.dto';

@Injectable()
export class BasketService {
  constructor(private readonly basketRepository: BasketRepository) {}

  async getAllBasket(req: Request): Promise<Array<Basket>> {
    console.log(req.user);
    const userId = req.user['userId'];
    return this.basketRepository.getAllBasket(userId);
  }

  async createBasket(req: Request, basket: CreateBasket): Promise<CoreOutput> {
    const userId = req.user['userId'];
    return this.basketRepository.createBasket(userId, basket);
  }

  async deleteBasket(req: Request, basketId: number): Promise<CoreOutput> {
    const userId = req.user['userId'];
    const basketIds = basketId['id'];
    return this.basketRepository.deleteBasket(userId, basketIds);
  }
}
