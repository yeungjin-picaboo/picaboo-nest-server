import { PickType } from '@nestjs/mapped-types';
import { Qna } from '../entities/qna.entity';

export class UpdateQuestionDto extends PickType(Qna, ['title', 'content', 'isPrivate']) {}
