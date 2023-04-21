import { PickType } from '@nestjs/mapped-types';
import { arrayNotContains } from 'class-validator';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Diary } from '../entities/diary.entity';

export class GetDiaryOutput extends CoreOutput {
  diary?: Diary;
}

