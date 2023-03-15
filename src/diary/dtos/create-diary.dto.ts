import { CoreOutput } from 'src/common/dto/output.dto';

import { PickType } from '@nestjs/mapped-types';
import { Diary } from '../entities/diary.entity';

export class CreateDiaryDto extends PickType(Diary, ['title', 'content']) {} // 일기 생성 DB

export class CreateMoodDto extends PickType(Diary, ['emotion']) {}

export class CreateDiaryOutput extends CoreOutput {}
