import { Body, Controller, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dto/weahter.dto';

@Controller('weather')
export class WeatherController {
	constructor(private weatherService: WeatherService) {}

	@Post()
	async weatherData(@Body() dto: WeatherDto) {
		try {
			// let k = await this.weatherService.getWeather(dto);
			console.log('this is k = ', 'his');
			console.log('this is', this.weatherService.getWeather(dto));
			return this.weatherService.getWeather(dto);
		} catch (err) {
			return err;
		}
	}
}
