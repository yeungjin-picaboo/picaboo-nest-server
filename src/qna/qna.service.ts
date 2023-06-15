import { Injectable } from '@nestjs/common';
import { QnaRepository } from './repositories/qna.repository';
import { GetCreateQuestionDto } from './dto/qna.dto';
import { Request } from 'express';
import { UpdateQuestionDto } from './dto/update-diary.dto';
import { AnswerRepository } from './repositories/answer.repository';

// QnAService クラス
@Injectable()
export class QnaService {
  // コンストラクタで依存性を注入
  constructor(
    private readonly qnaRepository: QnaRepository,
    private readonly answerRepository: AnswerRepository
  ) {}

  // 全てのQ&Aを取得
  async getAllQna(page: number) {
    try {
      return this.qnaRepository.getAllQna(page);
    } catch (error) {}
  }

  // 新しいQ&A作成
  async createQna(createQuestion: GetCreateQuestionDto, req: Request) {
    const { title, content, isPrivate } = createQuestion;
    const nickname = req.user['nickname'];
    console.log(nickname);
    return this.qnaRepository.createQuestion(title, content, nickname, isPrivate);
  }

  // 質問を表示
  async showQuestion(question_id: number, req: Request) {
    const nickname = req.user['nickname'];
    const question = await this.qnaRepository.showQuestion(question_id, nickname);
    console.log(question);
    const answer = await this.answerRepository.showAnswer(question_id);
    console.log(answer);
    return { question, answer };
  }

  // 質問を削除
  async deleteQuestion(question_id: number, req: Request) {
    const nickname = req.user['nickname'];
    return this.qnaRepository.deleteQuestion(question_id, nickname);
  }

  // 質問を更新
  async updateQuestion(question_id: number, req: Request, updateQuestion: UpdateQuestionDto) {
    const nickname = req.user['nickname'];
    return this.qnaRepository.updateQuestion(question_id, nickname, updateQuestion);
  }

  // 回答を作成
  async createAnswer(question_id, content, req: Request) {
    const nickname = req.user['nickname'];
    return await this.answerRepository.createAnswer(nickname, content, question_id);
  }
}
