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

  async createAnswer(nickname: string, { content }, questionId: number) {
    try {
      console.log('nickname :', nickname);
      console.log('content :', content);
      console.log('questionId :', questionId);

      const create = this.AnswerRepository.create({
        nickname: nickname,
        questionId,
        content
      });
      const result = await this.AnswerRepository.save(create);

      const question = await this.QuestionRepositroy.update(
        { id: questionId },
        { answerId: create.id }
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

  async showAnswer(questionId: number) {
    try {
      const answer = await this.AnswerRepository.findOneBy({ questionId });
      return answer;
    } catch (error) {
      return error;
    }
  }
}
