import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather-mood.service';
import { GetWeatherDto } from './dto/weahter.dto';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  // @UseGuards(AccessTokenGuard)
  // @Post('')
  // async weatherData(@Body() req: GetWeatherDto) {
  //   console.log(req);
  //   // body에서는 위도와 content를 전달해줌.
  //   try {
  //     const { latitude, longitude } = req;

  //     const coordinate: GetCoordinateDto = { latitude, longitude };
  //     const weather = await this.weatherService.getWeather(coordinate); // 날씨를 받음

  //     // const modifyContent = new GetEmotionDto(content);

  //     console.log(weather);
  //     return { weather };
  //     // return { weather: 'Clear', mood: 'positive' };
  //   } catch (err) {
  //     return err;
  //   }
}
