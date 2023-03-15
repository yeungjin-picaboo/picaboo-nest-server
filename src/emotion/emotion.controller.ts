import { Body, Controller, Post } from '@nestjs/common';
import { EmotionService } from './emotion.service';

@Controller('emotion')
export class EmotionController {
  constructor(private emotion: EmotionService) {}

  @Post()
  summarizeTxt(@Body() dto: JSON) {
    try {
      return this.emotion.sentimentTxt(dto);
    } catch (error) {
      return error;
    }

    // return this.summarize.summarizeTxt(dto);
  }
}
