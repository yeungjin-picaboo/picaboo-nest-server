import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entities';
import { BasketRepository } from './repositories/basket.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Basket])],
  controllers: [BasketController],
  providers: [BasketService, BasketRepository]
})
export class BasketModule {}
