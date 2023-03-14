import { IsString } from 'class-validator';

export class CreatePictureDto {
	@IsString()
	readonly title: string;

	@IsString()
	readonly user_email: string;

	@IsString()
	readonly user_name: string;
}
