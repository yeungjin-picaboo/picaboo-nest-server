import { Body, Controller, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dto/weahter.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('weather')
@ApiTags('날씨 API')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Post()
  @ApiOperation({ summary: '날씨정보를 가져오는 API', description: '날씨 정보 가져오기' })
  @ApiCreatedResponse({ description: '경도와 위도 정보를 가져옵니다', type: WeatherDto })
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
