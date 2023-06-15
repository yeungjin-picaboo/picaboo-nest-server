import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import { CreateDiaryDto, CreateDiaryOutput, CreateRate, DiaryDto } from './dtos/create-diary.dto';
import { DeleteDiaryOutput } from './dtos/delete-diary.dto';
import { GetDiaryOutput } from './dtos/get-diary.dto';
import { UpdateDiaryDto, UpdateDiaryOutput } from './dtos/update-diary.dto';
import { DiarysRepository } from './repositories/diary.repository';
import { returnMsg } from 'src/common/return.type';
import { Diary } from './entities/diary.entity';

@Injectable()
export class DiarysService {
  constructor(private readonly diaryRepository: DiarysRepository) {}

  // すべての日記を取得するメソッド
  async getAllDiary(userId: number, year: string, month: string) {
    const date = year + '-' + month;
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

  // 特定の日記を取得するメソッド
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

  // 新しい日記を作成するメソッド
  async createDiary(
    createDiaryDto: CreateDiaryDto,
    req: Request
  ): Promise<Diary | { ok; message } | any> {
    try {
      console.log(createDiaryDto);
      const diary = await this.diaryRepository.createDiary({
        ...createDiaryDto,
        userId: req.user['userId']
      });
      console.log('외부의', diary);
      if (diary == '이미 오늘 작성한 일기가 있습니다') {
        return returnMsg(false, '안됨');
      }
      console.log('Created Diary');
      return diary;
    } catch (error) {
      console.error(error);

      return error;
    }
  }

  // 日記を削除するメソッド
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

  // 日記を更新するメソッド
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

  // カレンダーで表示する日記を取得するメソッド
  async getCalendarDiary(userId) {
    try {
      return await this.diaryRepository.getCalendarDiary(userId);
    } catch (error) {}
  }

  // 画像作成のためのメソッド
  async createImage(content: string) {
    try {
      const imageURL = `http://192.168.0.223:9000/api/diaries/picture/${content}`;
      const responseAi = await axios.get(imageURL);
      const imgName = responseAi.data;
      console.log(content);

      return imgName;
    } catch (error) {
      return { error: 'Failed to get image URL' };
    }
  }

  // 画像を保存するメソッド
  async saveImage(diary_id: number, source: string) {
    console.log('id', diary_id);
    console.log('source', source);

    await this.diaryRepository.saveImage(diary_id, source);
  }

  // 感情分析結果を取得するメソッド
  async getEmotion(content: string) {
    try {
      const emotionURL = `http://192.168.0.223:9000/api/diaries/emotion/${content}`;
      const responseAI = await axios.get(emotionURL);
      const emotion = responseAI.data;
      console.log('service emotion:', emotion);

      return emotion;
    } catch (error) {
      return { error: 'Failed to get content' };
    }
  }

  // 星評価を保存するメソッド
  async saveRatingStar(rating: CreateRate) {
    try {
      const { rate, diary_id } = rating;
      return await this.diaryRepository.saverRating(rate, diary_id);
    } catch (err) {}
  }
}
