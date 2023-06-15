import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from '../entities/basket.entities';
import { Repository } from 'typeorm';
import { returnMsg } from 'src/common/return.type';
import { CoreOutput } from 'src/common/dto/output.dto';
import { CreateBasket } from '../dtos/create-basket.dto';

@Injectable()
// 買い物かごサービス
export class BasketRepository {
  // 買い物かごリポジトリを注入
  constructor(@InjectRepository(Basket) private readonly basketRepository: Repository<Basket>) {}

  // ユーザーIDによるすべての買い物かごの取得(取得用)
  async getAllBasket(userId: number): Promise<Array<Basket>> {
    try {
      const basketList = await this.basketRepository.find({ where: { userId } });
      basketList.forEach(basket => delete basket.userId);
      return basketList;
    } catch (error) {
      return error.message;
    }
  }

  // 買い物かごの作成(作成用)
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
        return returnMsg(true, '成功的に作成されました');
      } else {
        return returnMsg(false, '買い物かごの作成に失敗しました');
      }
    } catch (error) {
      return returnMsg(false, 'エラー', error.message);
    }
  }

  // バスケット削除(削除用)
  async deleteBasket(userId: number, basketId: number): Promise<CoreOutput> {
    try {
      const deleteBasket = await this.basketRepository.delete({
        id: basketId,
        userId
      });
      if (deleteBasket) {
        return returnMsg(true, '正常に削除されました');
      } else {
        return returnMsg(false, '削除に失敗しました');
      }
    } catch (error) {
      return returnMsg(false, 'エラー', error.message);
    }
  }
}
