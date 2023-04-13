import { PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { Diary } from 'src/diary/entities/diary.entity';

export class GetWeatherDto {
  @IsString()
  readonly latitude: string;

  @IsString()
  readonly longitude: string;

  @IsString()
  readonly content: string;
}

export class GetCoordinateDto {
  @IsString()
  readonly longitude: string;

  @IsString()
  readonly latitude: string;
}

export class UpdateWeatherDtoId {
  @IsString()
  readonly id: number;

  @IsString()
  readonly weather: number;
}
export class CreateWeatherDto extends PickType(Diary, ['content', 'weather']) {}