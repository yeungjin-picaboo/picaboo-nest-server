import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Diary } from 'src/diary/entities/diary.entity';
import { CreateWeatherDto } from 'src/weather-mood/dto/weahter.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SharedRepository implements SharedRepository {
  constructor(@InjectRepository(Diary) private readonly weatherRepository: Repository<Diary>) {}

  async getIdByContent(dto: CreateWeatherDto): Promise<number> {
    const { content } = dto;
    const entity = await this.weatherRepository.findOneBy({ content });
    return entity?.id;
  } // content로 id를 조회하는 쿼리
}
