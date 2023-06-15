import { Module } from '@nestjs/common';
import { WeatherService } from './weather-mood.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary } from 'src/diary/entities/diary.entity';
import { WeatherMoodRepository } from './repositories/weather-mood.repository';
import { SharedRepository } from 'src/domain-module/shared-repository/getIdByContent.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  exports: [WeatherService, WeatherMoodRepository],
  providers: [WeatherService, WeatherMoodRepository, SharedRepository]
})
export class WeatherModule {}
