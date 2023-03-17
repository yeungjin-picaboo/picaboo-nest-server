import { Body, Controller, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetCoordinateDto, GetWeatherDto, UpdateWeatherDtoId } from './dto/weahter.dto';
import { CreateWeatherDto } from 'src/diary/dtos/create-diary.dto';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Post()
  async weatherData(@Body() dto: GetWeatherDto) {
    // body에서는 위도와 content를 전달해줌.
    try {
      let { latitude, longitude } = dto;
      const coordinate: GetCoordinateDto = { latitude, longitude };
      const weather = await this.weatherService.getWeather(coordinate); // 날씨를 받음
      console.log(weather);
      return { weather };
      // const weatherDto: CreateWeatherDto = { content, weather };
      // return this.weatherService.updateWeatherByContent(weatherDto);
      // return this.weatherService.createWeather(dto);
    } catch (err) {
      return err;
    }
  }
}
