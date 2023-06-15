import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetWeatherDto } from './dto/weahter.dto';
import { WeatherMoodRepository } from './repositories/weather-mood.repository';
import { returnEmotionDto } from './dto/return-type-weather-mood.dto';

@Injectable()
export class WeatherService {
  constructor(private readonly weatherRepository: WeatherMoodRepository) {}

  /**
   * 1次的にウェブからサーバーに送る座標でString(天気)を返す(weather)別途DB操作することはない。
   * @param weatherDto longtitde, latitude
   * @returns
   */
  async getWeather(latitude: string, longitude: string): Promise<string | undefined> {
    // const { latitude, longitude } = weatherDto;
    try {
      console.log('weather service latitude : ', latitude);
      console.log('weatger servuce longitude : ', longitude);

      const weatherData = await axios.post(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`
      );
      const { weather } = weatherData.data;
      console.log(weather[0].main);
      const changeWeather = weather[0].main;
      function weatherConverter(changeWeather): string {
        switch (changeWeather) {
          case 'Clear':
            return 'sunny';
          case 'Drizzle':
          case 'Rain':
          case 'Thunderstorm':
            return 'rainy';
          case 'Snow':
            return 'snowy';
          case 'Clouds':
          case 'Mist':
          case 'Smoke':
          case 'Haze':
          case 'Dust':
          case 'Fog':
          case 'Sand':
          case 'Ash':
          case 'Squall':
          case 'Tornado':
            return 'cloudy';
          default:
            return 'windy';
        }
      }

      return weatherConverter(changeWeather);
    } catch (err) {
      console.log('error : ', err.request.data);
    }
  }
}
