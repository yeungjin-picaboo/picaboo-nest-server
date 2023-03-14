import { IsString } from 'class-validator';

export class SummarizeTxt {
	@IsString()
	readonly title: string;
}
