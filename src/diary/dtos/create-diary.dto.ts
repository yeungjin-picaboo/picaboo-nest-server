import { CoreOutput } from 'src/common/dto/output.dto';

import { PickType } from '@nestjs/mapped-types';
import { Diary } from '../entities/diary.entity';

export class CreateDiaryDto extends PickType(Diary, [
  'title',
  'content',
  'date',
  'emotion',
  'weather'
]) {} // 일기 생성 DB

export class DiaryDto extends PickType(Diary, [
  'diary_id',
  'userId',
  'title',
  'content',
  'date',
  'emotion',
  'weather'
]) {} // 일기 생성 DB

export class WeatherEmotion extends PickType(Diary, ['diary_id', 'content']) {} // 일기 생성 DB

export class CreateEmotionDto extends PickType(Diary, ['content', 'title']) {}

export class CreateRate extends PickType(Diary, ['diary_id', 'rate']) {}

export interface Weather {
  content: string;
  latitude: string;
  longitude: string;
}

export class CreateDiaryOutput extends CoreOutput {}
