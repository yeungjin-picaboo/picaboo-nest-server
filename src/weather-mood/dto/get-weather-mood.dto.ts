import { PickType } from '@nestjs/mapped-types';
import { Diary } from 'src/diary/entities/diary.entity';

export class GetEmotionDto extends PickType(Diary, ['content']) {}
