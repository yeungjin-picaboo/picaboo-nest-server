import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { CreateDiaryDto, CreateDiaryOutput } from './dtos/create-diary.dto';
import { DeleteDiaryDto } from './dtos/delete-diary.dto';
import { DiarysRepository } from './repositories/diary.repository';

@Injectable()
export class DiarysService {
  constructor(private readonly diaryRepository: DiarysRepository) {}

  // getAllDiary() {}

  // async getDiary(id: number): Promise<Diary> {
  // const found = await this.diaryRepository.findOne(id);

  // if (!found) {
  //   throw new NotFoundException(`Cant't find Diary with id ${id}`);
  // }

  // return found;
  // }

  async createDiary(
    createDiaryDto: CreateDiaryDto,
    req: Request,
  ): Promise<CreateDiaryOutput> {
    try {
      await this.diaryRepository.createDiary({
        ...createDiaryDto,
        userId: req.user['userId'],
      });
      console.log('Created Diary');
      return {
        ok: true,
      };
    } catch (error) {
      console.error('Failed');
      return {
        ok: false,
      };
    }
  }

  async deleteDiary(diaryId: number): Promise<DeleteDiaryDto> {
    try {
      const result = await this.diaryRepository.deleteDiary(diaryId);
      if (!result) {
        return {
          ok: false,
          error: 'Failed to delete diary. Diary not found',
        };
      }
      return {
        ok: true,
        message: 'Diary successfully deleted',
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}
