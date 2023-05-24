import { IsString } from 'class-validator';

export class NftCommentDto {
  @IsString()
  readonly token_id: number;

  @IsString()
  readonly content: string;
}
