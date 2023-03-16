import { IsString } from 'class-validator';

export class EmotionDto {
  @IsString()
  readonly emotion: string;
  @IsString()
  readonly content: string;
}
