import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { QnaService } from './qna.service';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Qna } from './entities/qna.entity';

@Controller('qna')
export class QnaController {
  constructor(private qnaService: QnaService) {}

  @UseGuards(AccessTokenGuard)
  @Get('')
  @ApiOperation({ summary: '전체 질문정보 Api', description: '질문 전체 정보 가져오기' })
  @ApiCreatedResponse({ description: '전체 질문글을 가져옵니다', type: Qna })
  async getAll(@Body('page') page: number) {
    return this.qnaService.getAllQna(page);
  }

  @UseGuards(AccessTokenGuard)
  @Post('')
  @ApiOperation({ summary: '질문 작성 Api', description: '질문을 생성합니다.' })
  @ApiCreatedResponse({ description: '전체 질문글을 가져옵니다', type: Qna })
  async createQuestion(@Body('page') page: number){
      
  }
}
