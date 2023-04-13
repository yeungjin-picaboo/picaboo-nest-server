import { PickType } from '@nestjs/mapped-types';
import { Qna } from '../entities/qna.entity';

export class GetDiaryDto extends PickType(Qna, ['title', 'nickName', 'id', 'createdAt']) {}
