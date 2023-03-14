import { IsString } from 'class-validator';

export class returnWeather {
	@IsString()
	readonly weather: string;
}
