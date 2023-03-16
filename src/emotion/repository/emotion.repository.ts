import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from 'src/diary/entities/diary.entity';
import { SharedRepository } from 'src/domain-module/shared-repository/getIdByContent.repository';
import { Repository } from 'typeorm';
import { EmotionDto } from '../dto/emotion.dto';

@Injectable()
export class EmotionRepository {
  constructor(
    @InjectRepository(Diary) private readonly EmotionRepository: Repository<Diary>,
    private readonly sharedRepository: SharedRepository
  ) {}

  async updateWeatherById(emotionDto: EmotionDto): Promise<Diary> {
    const id = await this.sharedRepository.getIdByContent(emotionDto);

    const emotionStatus = await this.EmotionRepository.findOneBy({ id });
    if (emotionStatus) {
      emotionStatus.emotion = emotionDto.emotion;
    }
    this.EmotionRepository.save(emotionStatus);
    return emotionStatus;
  } // getIdByConetnt를 가져와서 weatherStatus 변수에 저장후 유효성 검사 후 weatherDto변경
}
