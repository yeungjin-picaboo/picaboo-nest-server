import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';
import { CreateDiaryDto, CreateDiaryOutput } from './dtos/create-diary.dto';
import { DeleteDiaryDto } from './dtos/delete-diary.dto';
import { UpdateDiaryDto, UpdateDiaryOutput } from './dtos/update-diary.dto';
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

  async createDiary(createDiaryDto: CreateDiaryDto, req: Request): Promise<CreateDiaryOutput> {
    try {
      await this.diaryRepository.createDiary({
        ...createDiaryDto,
        userId: req.user['userId']
      });
      console.log('Created Diary');
      return {
        ok: true
      };
    } catch (error) {
      console.error('Failed');
      return {
        ok: false
      };
    }
  }

  async deleteDiary(diaryId, userId): Promise<DeleteDiaryDto> {
    try {
      const result = await this.diaryRepository.deleteDiary({ diaryId, userId });
      if (!result) {
        return {
          ok: false,
          error: 'Failed to delete diary. Diary not found'
        };
      }
      return {
        ok: true,
        message: 'Diary successfully deleted'
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  }

  async updateDiary(diaryId, userId, updateDiaryDto: UpdateDiaryDto): Promise<UpdateDiaryOutput> {
    try {
      const update = await this.diaryRepository.updateDiary(diaryId, updateDiaryDto, userId);
      console.log(update, '444');

      if (!update) {
        return {
          ok: false,
          error: 'Failed to update diary'
        };
      }
      return {
        ok: true,
        message: 'Diary successfully updated'
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  }
}
