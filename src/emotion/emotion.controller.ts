import { Body, Controller, Post } from '@nestjs/common';
import { EmotionService } from './emotion.service';
import { BodyEmotionDto } from 'src/diary/dtos/create-diary.dto';

@Controller('emotion')
export class EmotionController {
  constructor(private emotion: EmotionService) {}

  @Post()
  summarizeTxt(@Body() dto: BodyEmotionDto) {
    try {
      return this.emotion.sentimentTxt(dto);
    } catch (error) {
      return error;
    }

    // return this.summarize.summarizeTxt(dto);
  }
}
