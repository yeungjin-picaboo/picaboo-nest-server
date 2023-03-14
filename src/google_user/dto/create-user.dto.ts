import { IsString } from 'class-validator';

export class CreateGoogleUserDto {
	@IsString()
	readonly email: string;

	@IsString()
	readonly nick_name: string;
}
