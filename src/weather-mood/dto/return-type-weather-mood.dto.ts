import { PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { Diary } from 'src/diary/entities/diary.entity';

export class returnWeather {
  @IsString()
  readonly weather: string;
}

export class returnEmotionDto extends PickType(Diary, ['emotion']) {}
