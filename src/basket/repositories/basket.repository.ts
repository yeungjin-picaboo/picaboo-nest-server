import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from '../entities/basket.entities';
import { Repository } from 'typeorm';
import { returnMsg } from 'src/common/return.type';
import { CoreOutput } from 'src/common/dto/output.dto';
import { CreateBasket } from '../dtos/create-basket.dto';

@Injectable()
export class BasketRepository {
  constructor(@InjectRepository(Basket) private readonly basketRepository: Repository<Basket>) {}

  async getAllBasket(userId: number): Promise<Array<Basket>> {
    try {
      const basketList = await this.basketRepository.find({ where: { userId } });

      return basketList;
    } catch (error) {
      return error.message;
    }
  }

  async createBasket(userId: number, basket: CreateBasket): Promise<CoreOutput> {
    try {
      const createBasket = await this.basketRepository.create({
        userId,
        ...basket
      });
      console.log(createBasket);
      if (createBasket != null) {
        await this.basketRepository.save(
          this.basketRepository.create({
            userId,
            ...basket
          })
        );
        return returnMsg(true, 'successfully created');
      } else {
        return returnMsg(false, 'failed to create basket');
      }
    } catch (error) {
      return returnMsg(false, 'error', error.message);
    }
  }

  async deleteBasket(userId: number, basketId: number): Promise<CoreOutput> {
    try {
      const deleteBasket = await this.basketRepository.delete({
        id: basketId,
        userId
      });
      if (deleteBasket) {
        return returnMsg(true, 'successfully deleted');
      } else {
        return returnMsg(false, 'failed to delete');
      }
    } catch (error) {
      return returnMsg(false, 'error', error.message);
    }
  }
}
