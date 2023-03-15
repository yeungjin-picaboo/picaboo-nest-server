import { IsString } from 'class-validator';

export class SummarizeDto {
	@IsString()
	readonly diary: string;
}
