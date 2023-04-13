import { Controller, UseGuards } from '@nestjs/common';
import { QnaService } from './qna.service';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@Controller('qna')
export class QnaController {

   constructor(private qnaService: QnaService){}

   @UseGuards(AccessTokenGuard)
   async getAll(){
      
   }
}
