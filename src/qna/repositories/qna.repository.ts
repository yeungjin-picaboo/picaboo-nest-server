import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Qna } from '../entities/qna.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class QnaRepository {
  constructor(@InjectRepository(Qna) private readonly QnaRepository: Repository<Qna>) {}

  async getAllQna(page): Promise<Array<Qna>> {
    const qna = await this.QnaRepository.find({
      skip: page - 1 * 11,
      take: page * 11,
      order: { id: 'ASC' }
    });
    return qna;
  }

  async createQuestion(title, content, nickName, isPrivate) {
    const createQna = await this.QnaRepository.create({
      title,
      content,
      isPrivate,
      nickName
    });
  }
}
