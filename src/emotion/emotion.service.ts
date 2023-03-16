import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { EmotionRepository } from './repository/emotion.repository';
import { BodyEmotionDto } from 'src/diary/dtos/create-diary.dto';
import { EmotionDto } from './dto/emotion.dto';

@Injectable()
export class EmotionService {
  constructor(private readonly emotionRepository: EmotionRepository) {}

  async sentimentTxt(diary: BodyEmotionDto) {
    //! bodyEmotionDto의 타입은 content, title임

    const client_id = process.env.CLOVA_CLIENT_ID;
    const client_secret = process.env.CLOVA_SECRET;
    const url = process.env.CLOVA_URL;

    const headers = {
      'X-NCP-APIGW-API-KEY-ID': client_id,
      'X-NCP-APIGW-API-KEY': client_secret,
      'Content-Type': 'application/json'
    };
    // const { content } = diary;
    const content = { content: diary['content'] };

    try {
      let test = await axios.post(url, content, { headers });
      let emotionDto: EmotionDto = {
        emotion: test.data.document.sentiment,
        content: content.content
      };
      await this.emotionRepository.updateWeatherById(emotionDto);
      // return test.data.document.sentiment; // 기분을 리턴해준다
      return 'positive';
    } catch (error) {
      return error;
    }
  }
}
