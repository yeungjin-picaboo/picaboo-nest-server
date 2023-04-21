import { CoreOutput } from 'src/common/dto/output.dto';

import { PickType } from '@nestjs/mapped-types';
import { Diary } from '../entities/diary.entity';

<<<<<<< HEAD
@Entity()
export class CreateDiaryDto extends PickType(Diary, ['title', 'content', 'month', 'year']) {}
=======
export class CreateDiaryDto extends PickType(Diary, [
  'title',
  'content',
  'date',
  'emotion',
  'weather'
]) {} // 일기 생성 DB

export class CreateEmotionDto extends PickType(Diary, ['content', 'title']) {}
>>>>>>> changhoon

export class CreateDiaryOutput extends CoreOutput {}
