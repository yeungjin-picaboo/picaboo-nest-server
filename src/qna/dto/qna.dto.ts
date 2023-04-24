import { PickType } from '@nestjs/mapped-types';
import { Question } from '../entities/question.entity';

export class GetQuestionDto extends PickType(Question, ['title', 'nickname', 'id', 'createdAt']) {}
export class GetCreateQuestionDto extends PickType(Question, ['title', 'content', 'isPrivate']) {}
