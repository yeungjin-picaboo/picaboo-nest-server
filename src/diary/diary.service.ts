import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { CreateDiaryDto, CreateDiaryOutput } from './dtos/create-diary.dto';
import { DeleteDiaryOutput } from './dtos/delete-diary.dto';
import { GetDiaryOutput } from './dtos/get-diary.dto';
import { UpdateDiaryDto, UpdateDiaryOutput } from './dtos/update-diary.dto';
import { DiarysRepository } from './repositories/diary.repository';

@Injectable()
export class DiarysService {
  constructor(private readonly diaryRepository: DiarysRepository) {}

  async getAllDiary(userId, year, month) {
    try {
      const diaries = await this.diaryRepository.getAllDiary(userId, year, month);
      if (!diaries) {
        return 'Please check it one more time.';
      }
      return diaries;
    } catch (error) {
      console.error(error, 'Failed get diaries');
    }
  }

  async getDiary(diaryId, userId) {
    try {
      const result = await this.diaryRepository.getDiary(diaryId, userId);
      if (!result) {
        return 'Please check it one more time';
      }
      return result;
    } catch (error) {
      console.error(error, 'Failed get diary');
    }
  }

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
      console.error(error);

      return {
        ok: false,
        message: 'Failed create diary'
      };
    }
  }

  async deleteDiary(diaryId: number, userId): Promise<DeleteDiaryOutput> {
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
