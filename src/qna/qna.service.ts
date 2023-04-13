import { Injectable } from '@nestjs/common';
import { QnaRepository } from './repositories/qna.repository';

@Injectable()
export class QnaService {
  constructor(private readonly qnaRepository: QnaRepository) {}

  async getAllQna(page: number) {
    try {
      return this.qnaRepository.getAllQna(page);
    } catch (error) {}
  }

  async createQna(req:Request,body:Body){

  }
}
