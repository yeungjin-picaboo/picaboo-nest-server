import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { QnaService } from './qna.service';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Question } from './entities/question.entity';
import { GetCreateQuestionDto } from './dto/qna.dto';
import { Request } from 'express';
import { UpdateQuestionDto } from './dto/update-diary.dto';

@Controller('qna')
export class QnaController {
  constructor(private qnaService: QnaService) {}

  /**
   * ページ情報に応じて、何個を送るか（基本的では12個を表示）
   * @param page Bodyでページ情報[1ページ、2ページ]を送信
   * @returns オブジェクト配列を送信 [ { "id": number,
                              "title": string,
                              "content": string,
                              "isPrivate": boolean,
                              "nickname": string,
                              "answerId": null | string,
                              "createdAt": date} ]
   */
  @UseGuards(AccessTokenGuard)
  @Get('/page/:id')
  @ApiOperation({ summary: '全体の質問情報API', description: '質問の全体情報を取得します' })
  @ApiCreatedResponse({ description: '全体の質問投稿を取得します', type: Question })
  async getAll(@Param('id') id: number) {
    return this.qnaService.getAllQna(id);
  }
  /**
   * 記事作成API
   * @param createQuestion 作成のための最小情報
   * @param req JWT token
   * @returns
   * {
      "ok": true,
      "message": "質問が正常に作成されました"
    }
   */
  @UseGuards(AccessTokenGuard)
  @Post('')
  @ApiOperation({ summary: '質問作成API', description: '質問を作成します。' })
  @ApiCreatedResponse({ description: '記事を作成します', type: Question })
  async createQuestion(@Body() createQuestion: GetCreateQuestionDto, @Req() req: Request) {
    return this.qnaService.createQna(createQuestion, req);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:questionId')
  @ApiOperation({ summary: '質問詳細API', description: '質問を照会します。' })
  @ApiCreatedResponse({ description: '質問をクリックしたときに表示される詳細ページです。', type: Question })
  async showQuestion(@Param('questionId') questionId: number, @Req() req: Request) {
    return this.qnaService.showQuestion(questionId, req);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:questionId')
  @ApiOperation({ summary: '質問削除API', description: '質問を削除します。' })
  @ApiCreatedResponse({ description: '質問を削除するAPIです。', type: Question })
  async deleteQuestion(@Param('questionId') questionId: number, @Req() req: Request) {
    return this.qnaService.deleteQuestion(questionId, req);
  }
  @UseGuards(AccessTokenGuard)
  @Put('/:questionId')
  @ApiOperation({ summary: '質問編集API', description: '質問を編集します。' })
  @ApiCreatedResponse({ description: '質問を編集するAPIです。', type: Question })
  async updateQuestion(
    @Param('questionId') questionId: number,
    @Body() updateQuestion: UpdateQuestionDto,
    @Req() req: Request
  ) {
    return this.qnaService.updateQuestion(questionId, req, updateQuestion);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/:questionId')
  async createAnswer(
    @Param('questionId') questionId: number,
    @Body() content,
    @Req() req: Request
  ) {
    console.log('questionId: ' + questionId);

    return this.qnaService.createAnswer(questionId, content, req);
  }
}
