import { PickType } from '@nestjs/mapped-types';
import { Question } from '../entities/question.entity';

export class UpdateQuestionDto extends PickType(Question, ['title', 'content', 'isPrivate']) {}
