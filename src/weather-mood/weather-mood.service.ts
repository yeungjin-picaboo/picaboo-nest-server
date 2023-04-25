import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetWeatherDto } from './dto/weahter.dto';
import { WeatherMoodRepository } from './repositories/weather-mood.repository';
import { returnEmotionDto } from './dto/return-type-weather-mood.dto';

@Injectable()
export class WeatherService {
  constructor(private readonly weatherRepository: WeatherMoodRepository) {}

  /**
   * 1차적으로 웹에서 서버로 보내는 좌표로 String(날씨)를 리턴해줌 (weather)
   * 따로 DB 조작할 일은 없음
   * @param weatherDto longtitde, latitude
   * @returns
   */
  async getWeather(latitude: string, longitude: string): Promise<string> {
    // const { latitude, longitude } = weatherDto;
    try {
      const weatherData = await axios.post(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`
      );
      const { weather } = weatherData.data;
      console.log('111111', weather[0].main);

      return weather[0].main;
    } catch (err) {
      console.log('error : ', err);
    }
  }

  /**
   * 1차적으로 웹에서 서버로 보내는 content로 returnEmotionDto를 리턴해줌 (emotion)
   * 따로 DB 조작할 일은 없음
   * @param moodDto content
   * @returns returnEmotionDto = { emotion }
   */
  // async getMood(content: string): Promise<returnEmotionDto> {
  //   const client_id = process.env.CLOVA_CLIENT_ID;
  //   const client_secret = process.env.CLOVA_SECRET;
  //   const url = process.env.CLOVA_URL;

  //   const headers = {
  //     'X-NCP-APIGW-API-KEY-ID': client_id,
  //     'X-NCP-APIGW-API-KEY': client_secret,
  //     'Content-Type': 'application/json'
  //   };
  //   // const { content } = diary;

  //   const data = { content };

  //   try {
  //     let test = await axios.post(url, data, { headers });
  //     let emotionDto: returnEmotionDto = test.data.document.sentiment;

  //     return emotionDto;
  //   } catch (error) {
  //     return error;
  //   }
  // }
}
