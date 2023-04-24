import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { returnMsg } from 'src/common/return.type';
import { Question } from '../entities/question.entity';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectRepository(Answer) private readonly AnswerRepository: Repository<Answer>,
    @InjectRepository(Question) private readonly QuestionRepositroy: Repository<Question>
  ) {}

  async createAnswer(nickname, { content }, questionId) {
    try {
      const create = this.AnswerRepository.create({
        user: { nickname },
        question: { id: questionId },
        content
      });
      const result = await this.AnswerRepository.save(create);

      const question = await this.QuestionRepositroy.update(
        { id: questionId },
        { answer: { id: create.id } }
      );

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
