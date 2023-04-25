import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import { CreateDiaryDto, CreateDiaryOutput, DiaryDto } from './dtos/create-diary.dto';
import { DeleteDiaryOutput } from './dtos/delete-diary.dto';
import { GetDiaryOutput } from './dtos/get-diary.dto';
import { UpdateDiaryDto, UpdateDiaryOutput } from './dtos/update-diary.dto';
import { DiarysRepository } from './repositories/diary.repository';

@Injectable()
export class DiarysService {
  constructor(private readonly diaryRepository: DiarysRepository) {}

  async getAllDiary(userId, year, month) {
    const date = year + '-0' + month;
    console.log(date);

    try {
      const diaries = await this.diaryRepository.getAllDiary(userId, date);
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

  async createDiary(createDiaryDto: CreateDiaryDto, req: Request): Promise<DiaryDto> {
    try {
      // console.log('user : ', req.user);
      // console.log(createDiaryDto);
      const diary = await this.diaryRepository.createDiary({
        ...createDiaryDto,
        userId: req.user['userId']
      });
      console.log('Created Diary');
      return diary;
      // return {
      //   ok: true
      // };
    } catch (error) {
      console.error(error);

      return error;
      // return {
      //   ok: false,
      //   message: 'Failed create diary'
      // };
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

  async getCalendarDiary(userId) {
    try {
      return await this.diaryRepository.getCalendarDiary(userId);
    } catch (error) {}
  }

  async createImage(content: string) {
    try {
      const imageURL = `http://172.21.4.175:9000/api/diaries/picture/${content}`;
      const responseAi = await axios.get(imageURL);
      const imgName = responseAi.data;
      console.log(content);

      return imgName;
    } catch (error) {
      return { error: 'Failed to get image URL' };
    }
  }

  async saveImage(id: number, source: string) {
    await this.diaryRepository.saveImage(id, source);
  }

  // async saveWeather(id: number, weather: string) {
  //   await this.diaryRepository.saveWeather(id, weather);
  // }

  async getEmotion(content: string) {
    try {
      const emotionURL = `http://172.21.4.175:9000/api/diaries/emotion/${content}`;
      const responseAI = await axios.get(emotionURL);
      const emotion = responseAI.data;
      console.log(emotion);

      return emotion;
    } catch (error) {
      return { error: 'Failed to get content' };
    }
  }
}
