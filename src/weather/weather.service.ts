import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { WeatherDto } from './dto/weahter.dto';
import axios from 'axios';
import { returnWeather } from './dto/returnWeather.dto';

@Injectable()
export class WeatherService {
	constructor(private dataSource: DataSource) {}

	async getWeather(weatherDto: WeatherDto): Promise<returnWeather> {
		const { latitude, longitude } = weatherDto;
		console.log(weatherDto);
		const weatherData = await axios.post(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
		);
		const { weather } = weatherData.data;
		console.log(weatherData.data);
		console.log('weather is ', weather[0].main);
		console.log('weather is ' + typeof weather);

		return { weather: weather[0].main };
	}
}
