import { CoreOutput } from 'src/common/dto/output.dto';
import { Entity } from 'typeorm';
import { PickType } from '@nestjs/mapped-types';
import { Diary } from '../entities/diary.entity';

@Entity()
export class CreateDiaryDto extends PickType(Diary, [
  'title',
  'content',
  'year',
  'month',
]) {}

export class CreateDiaryOutput extends CoreOutput {}
