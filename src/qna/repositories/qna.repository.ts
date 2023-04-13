import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Qna } from '../entities/qna.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class QnaRepository {
  constructor(
    @InjectRepository(Qna) private readonly QnaRepository: Repository<Qna>,
    private readonly authService: AuthService
  ) {}

  async getAllQna(req: Request): Promise<Array> {
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken = await this.authService.decodeToken(token)
    const qna = await this.QnaRepository.findBy({ nickName: decodedToken.user });
  }
}
