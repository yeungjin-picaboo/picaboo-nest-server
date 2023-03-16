import { CoreOutput } from 'src/common/dto/output.dto';

import { PickType } from '@nestjs/mapped-types';
import { Diary } from '../entities/diary.entity';

export class CreateDiaryDto extends PickType(Diary, ['title', 'content']) {} // 일기 생성 DB

export class BodyEmotionDto extends PickType(Diary, ['content', 'title']) {}

export class CreateWeatherDto extends PickType(Diary, ['content', 'weather']) {}

export class CreateSourceDto extends PickType(Diary, ['title', 'source']) {}

export class UpdateWeatherDto extends PickType(Diary, ['id']) {}

export class CreateDiaryOutput extends CoreOutput {}
