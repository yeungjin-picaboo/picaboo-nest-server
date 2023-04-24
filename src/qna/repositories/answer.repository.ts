import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { returnMsg } from 'src/common/return.type';

@Injectable()
export class AnswerRepository {
  constructor(@InjectRepository(Answer) private readonly AnswerRepository: Repository<Answer>) {}

  async createAnswer(nickname, { content }, questionId) {
    try {
      const result = await this.AnswerRepository.save(
        this.AnswerRepository.create({
          user: { nickname },
          question: { id: questionId },
          content
        })
      );
      console.log('result : ', result);
      if (!result) {
        return returnMsg(false, 'failed to create answer');
      }

      return returnMsg(true, 'created answer');
    } catch (error) {
      console.log(error);
      return returnMsg(false, 'unKnown error: ' + error);
    }
  }
}
