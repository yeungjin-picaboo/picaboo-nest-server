import { Module } from '@nestjs/common';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QnaRepository } from './repositories/qna.repository';
import { AnswerRepository } from './repositories/answer.repository';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])],
  controllers: [QnaController],
  providers: [QnaService, QnaRepository, AnswerRepository]
})
export class QnaModule {}
