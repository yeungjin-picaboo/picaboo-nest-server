import { Body, Controller, Post } from '@nestjs/common';
import { WeatherService } from './weather-mood.service';
import { GetCoordinateDto, GetWeatherDto } from './dto/weahter.dto';
import { GetEmotionDto } from './dto/get-weather-mood.dto';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}
  @Post('ai-weather-mood')
  async weatherData(@Body() req: GetWeatherDto) {
    // body에서는 위도와 content를 전달해줌.
    try {
      const { latitude, longitude, content } = req;

      const coordinate: GetCoordinateDto = { latitude, longitude };
      const weather = await this.weatherService.getWeather(coordinate); // 날씨를 받음

      // const modifyContent = new GetEmotionDto(content);
      const mood = await this.weatherService.getMood(content);
      console.log(weather);
      return { weather, mood };
    } catch (err) {
      return err;
    }
  }
}
