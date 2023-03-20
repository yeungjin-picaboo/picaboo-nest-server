import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ description: 'Email' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Password' })
  @IsString()
  password: string;
}
