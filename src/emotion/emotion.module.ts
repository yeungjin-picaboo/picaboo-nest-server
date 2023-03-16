import { Module } from '@nestjs/common';
import { EmotionController } from './emotion.controller';
import { EmotionService } from './emotion.service';
import { Diary } from 'src/diary/entities/diary.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateMoodDto } from 'src/diary/dtos/create-diary.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  controllers: [EmotionController],
  providers: [EmotionService]
})
export class EmtotionModule {}
