import { PickType } from '@nestjs/mapped-types';
import { Qna } from '../entities/qna.entity';

export class GetQuestionDto extends PickType(Qna, ['title', 'nickname', 'id', 'createdAt']) {}
export class GetCreateQuestionDto extends PickType(Qna, ['title', 'content', 'isPrivate']) {}
