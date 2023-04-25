import { Module } from '@nestjs/common';
import { WeatherController } from './weather-mood.controller';
import { WeatherService } from './weather-mood.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary } from 'src/diary/entities/diary.entity';
import { WeatherMoodRepository } from './repositories/weather-mood.repository';
import { SharedRepository } from 'src/domain-module/shared-repository/getIdByContent.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  controllers: [WeatherController],
  exports: [WeatherService, WeatherMoodRepository],
  providers: [WeatherService, WeatherMoodRepository, SharedRepository]
})
export class WeatherModule {}
