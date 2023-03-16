import { Module } from '@nestjs/common';
import { EmotionController } from './emotion.controller';
import { EmotionService } from './emotion.service';
import { Diary } from 'src/diary/entities/diary.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmotionRepository } from './repository/emotion.repository';
import { SharedRepository } from 'src/domain-module/shared-repository/getIdByContent.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  controllers: [EmotionController],
  providers: [EmotionService, EmotionRepository, SharedRepository]
})
export class EmtotionModule {}
