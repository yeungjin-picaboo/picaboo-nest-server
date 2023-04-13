import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from 'src/diary/entities/diary.entity';
import { Repository } from 'typeorm';
import { SharedRepository } from 'src/domain-module/shared-repository/getIdByContent.repository';
import { CreateWeatherDto } from '../dto/weahter.dto';

@Injectable()
export class WeatherMoodRepository {
  constructor(
    @InjectRepository(Diary) private readonly weatherRepository: Repository<Diary>,
    private readonly sharedRepository: SharedRepository
  ) {}

  async updateWeatherById(weatherDto: CreateWeatherDto): Promise<Diary> {
    const id = await this.sharedRepository.getIdByContent(weatherDto); //? content로 id를 찾음

    const weatherStatus = await this.weatherRepository.findOneBy({ id });
    if (weatherStatus) {
      weatherStatus.weather = weatherDto.weather;
    }
    this.weatherRepository.save(weatherStatus);
    return weatherStatus;
  } // getIdByConetnt를 가져와서 weatherStatus 변수에 저장후 유효성 검사 후 weatherDto변경
}
