import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import axios from 'axios';
import { returnWeather } from './dto/returnWeather.dto';
import { Diary } from 'src/diary/entities/diary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetCoordinateDto, GetWeatherDto, UpdateWeatherDtoId } from './dto/weahter.dto';
import { CreateWeatherDto } from 'src/diary/dtos/create-diary.dto';
import { WeatherRepository } from './repositories/weather.repository';

@Injectable()
export class WeatherService {
  constructor(private readonly weatherRepository: WeatherRepository) {}

  async getWeather(weatherDto: GetCoordinateDto): Promise<string> {
    const { latitude, longitude } = weatherDto;
    try {
      const weatherData = await axios.post(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`
      );

      const { weather } = weatherData.data;
      console.log(weather[0].main);
      return weather[0].main;
    } catch (err) {
      //에러처리
    }
  }

  async updateWeatherByContent(weatherDto: CreateWeatherDto): Promise<string> {
    //? 이 함수에서 할일
    //? 이 함수에서
    try {
      await this.weatherRepository.updateWeatherById(weatherDto);
      return 'success';
    } catch (error) {
      //에러처리
    }
  }

  //   async createWeather(weatherDto: UpdateWeatherDto | UpdateWeatherDtoId): Promise<returnWeather> {
  //     if (weatherDto instanceof UpdateWeatherDto) {
  //       const { latitude, longitude, content } = weatherDto;
  //       console.log(1, weatherDto);
  //       try {
  //         const weatherData = await axios.post(
  //           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`
  //         );

  //         const { weather } = weatherData.data;

  //         const diaryId = await this.findOneBy({
  //           content
  //         });
  //         console.log(diaryId.id);
  //         // this.dataSource
  //         //   .createQueryBuilder()
  //         //   .insert()
  //         //   .into(Diary)
  //         //   .values([{ id: diaryId.id, weather: weather[0].main }])
  //         //   .execute();
  //         this.update(diaryId.id, {
  //           weather: weather[0].main
  //         });

  //         //         // console.log('weather is ', weather[0].main);
  //         //         // console.log('weather is ' + typeof weather);

  //         return { weather: weather[0].main };
  //       } catch (error) {
  //         return error;
  //       }
  //     }
  //   }
}
