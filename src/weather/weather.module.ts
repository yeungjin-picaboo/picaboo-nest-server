import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary } from 'src/diary/entities/diary.entity';
import { WeatherRepository } from './repositories/weather.repository';
import { SharedRepository } from 'src/domain-module/shared-repository/getIdByContent.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  controllers: [WeatherController],
  providers: [WeatherService, WeatherRepository, SharedRepository]
})
export class WeatherModule {}
