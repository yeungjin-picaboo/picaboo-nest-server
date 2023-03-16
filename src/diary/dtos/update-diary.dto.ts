import { PickType } from '@nestjs/mapped-types';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Entity } from 'typeorm';
import { Diary } from '../entities/diary.entity';

@Entity()
export class UpdateDiaryDto extends PickType(Diary, ['title', 'content']) {}

export class UpdateDiaryOutput extends CoreOutput {}
