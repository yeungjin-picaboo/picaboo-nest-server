import { Module } from '@nestjs/common';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';
import { QnaRepository } from './repositories/qna.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qna } from './entities/qna.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Qna])],
  controllers: [QnaController],
  providers: [QnaService, QnaRepository]
})
export class QnaModule {}
