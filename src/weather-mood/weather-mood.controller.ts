import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather-mood.service';
import { GetCoordinateDto, GetWeatherDto } from './dto/weahter.dto';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}


  @UseGuards(AccessTokenGuard)
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
