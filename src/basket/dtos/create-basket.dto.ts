import { PickType } from '@nestjs/mapped-types';
import { Basket } from '../entities/basket.entities';

export class CreateBasket extends PickType(Basket, ['source', 'title', 'price']) {}
