import { Injectable } from '@nestjs/common';
import { QnaRepository } from './repositories/qna.repository';
import { GetCreateQuestionDto } from './dto/qna.dto';
import { Request } from 'express';
import { UpdateQuestionDto } from './dto/update-diary.dto';

@Injectable()
export class QnaService {
  constructor(private readonly qnaRepository: QnaRepository) {}

  async getAllQna(page: number) {
    try {
      return this.qnaRepository.getAllQna(page);
    } catch (error) {}
  }

  async createQna(createQuestion: GetCreateQuestionDto, req: Request) {
    const { title, content, isPrivate } = createQuestion;
    const nickname = req.user['nickname'];
    return this.qnaRepository.createQuestion(title, content, nickname, isPrivate);
  }

  async showQuestion(question_id: number, req: Request) {
    //Question id , nickname
    const nickname = req.user['nickname'];
    return this.qnaRepository.showQuestion(question_id, nickname);
  }
  async deleteQuestion(question_id: number, req: Request) {
    const nickname = req.user['nickname'];
    return this.qnaRepository.deleteQuestion(question_id, nickname);
  }

  async updateQuestion(question_id: number, req: Request, updateQuestion: UpdateQuestionDto) {
    const nickname = req.user['nickname'];
    return this.qnaRepository.updateQuestion(question_id, nickname, updateQuestion);
  }
}
