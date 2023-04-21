import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { QnaService } from './qna.service';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Qna } from './entities/qna.entity';
import { GetCreateQuestionDto } from './dto/qna.dto';
import { Request } from 'express';
import { UpdateQuestionDto } from './dto/update-diary.dto';

@Controller('qna')
export class QnaController {
  constructor(private qnaService: QnaService) {}

  /**
   * 페이지 정보에따라 몇개를 보내줄지( 기본 12글을 보여줌 )
   * @param page Body로 페이지 정보[1페이지, 2페이지]를 보냄
   * @returns 객체 배열을 보냄 [ { "id": number,
                              "title": string,
                              "content": string,
                              "isPrivate": boolean,
                              "nickname": string,
                              "answerId": null | string,
                              "createdAt": date} ]
   */
  @UseGuards(AccessTokenGuard)
  @Get('/page/:id')
  @ApiOperation({ summary: '전체 질문정보 Api', description: '질문 전체 정보 가져오기' })
  @ApiCreatedResponse({ description: '전체 질문글을 가져옵니다', type: Qna })
  async getAll(@Param('id') id: number) {
    return this.qnaService.getAllQna(id);
  }
  /**
   * 글 작성 api
   * @param createQuestion 만들기위한 최소 정보
   * @param req JWT token
   * @returns
   * {
      "ok": true,
      "message": "Question successfully created"
    }
   */
  @UseGuards(AccessTokenGuard)
  @Post('')
  @ApiOperation({ summary: '질문 작성 Api', description: '질문을 생성합니다.' })
  @ApiCreatedResponse({ description: '글을 작성합니다', type: Qna })
  async createQuestion(@Body() createQuestion: GetCreateQuestionDto, @Req() req: Request) {
    return this.qnaService.createQna(createQuestion, req);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:questionId')
  @ApiOperation({ summary: '질문 상세 Api', description: '질문조회 합니다.' })
  @ApiCreatedResponse({ description: '질문을 클릭했을시 나오는 상세페이지입니다.', type: Qna })
  async showQuestion(@Param('questionId') questionId: number, @Req() req: Request) {
    return this.qnaService.showQuestion(questionId, req);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:questionId')
  @ApiOperation({ summary: '질문 삭제 Api', description: '질문삭제 합니다.' })
  @ApiCreatedResponse({ description: '질문을 삭제하는 api입니다.', type: Qna })
  async deleteQuestion(@Param('questionId') questionId: number, @Req() req: Request) {
    return this.qnaService.deleteQuestion(questionId, req);
  }
  @UseGuards(AccessTokenGuard)
  @Put('/:questionId')
  @ApiOperation({ summary: '질문 삭제 Api', description: '질문삭제 합니다.' })
  @ApiCreatedResponse({ description: '질문을 삭제하는 api입니다.', type: Qna })
  async updateQuestion(
    @Param('questionId') questionId: number,
    @Body() updateQuestion: UpdateQuestionDto,
    @Req() req: Request
  ) {
    return this.qnaService.updateQuestion(questionId, req, updateQuestion);
  }
}
