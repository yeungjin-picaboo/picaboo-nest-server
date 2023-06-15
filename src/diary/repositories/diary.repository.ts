import { ConsoleLogger, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { CustomRepository } from 'src/common/custom-repository.decorator';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateDiaryDto } from '../dtos/update-diary.dto';
import { Diary } from '../entities/diary.entity';

@Injectable()
@CustomRepository(Diary)
export class DiarysRepository {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>
  ) {}

  // ユーザーの全ての日記を取得する
  async getAllDiary(userId: number, date) {
    try {
      const query = await this.diaryRepository
        .createQueryBuilder('diary')
        .where(`diary.date LIKE :datePattern`, { datePattern: `${date}-%` })
        .andWhere(`diary.userId = :userId`, { userId })
        .orderBy({ diary_id: 'DESC' })
        .getMany();

      if (!query) {
        return 'You dont have diary';
      }
      return query;
    } catch (error) {
      console.error(error, 'Failed get diaries');
    }
  }

  // 特定の日記を取得する
  async getDiary(diaryId: number, userId: number): Promise<Diary | string | boolean> {
    try {
      const diary = await this.diaryRepository.findOneBy({
        diary_id: diaryId,
        user: { id: userId }
      });

      if (!diary) {
        return 'You dont have diary';
      }
      return diary;
    } catch (error) {
      return false;
    }
  }

  // 日記を作成する
  async createDiary({ title, content, emotion, weather, date, userId }): Promise<Diary | string> {
    try {
      const findDiary = await this.verifyDiary(date, userId);

      if (findDiary.length == 1) {
        return 'すでに今日作成した日記があります。';
      }

      const diary = await this.diaryRepository.save({
        title,
        content,
        emotion,
        weather,
        date,
        userId
      });

      return diary;
    } catch (error) {
      throw new Error('error');
    }
  }

  // 日記が存在するかどうかを確認する
  async verifyDiary(date: string, userId) {
    const findDiary = await this.diaryRepository.find({ where: { user: { id: userId }, date } });

    return findDiary;
  }

  // 日記を更新する
  async updateDiary(diary_id: number, updateDiaryDto: UpdateDiaryDto, userId: number) {
    try {
      const diary = await this.diaryRepository.update(
        { diary_id, userId },
        { source: null, ...updateDiaryDto }
      );

      if (!diary) {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  // 日記を削除する
  async deleteDiary({ diaryId, userId }) {
    const deleteDiary = await this.diaryRepository.delete({
      diary_id: diaryId,
      user: { id: userId }
    });
    if (deleteDiary.affected === 0) {
      return false;
    }
    return deleteDiary;
  }

  // ユーザーのカレンダーに表示する日記を取得する
  async getCalendarDiary(userId) {
    const getUserDiary = await this.diaryRepository.findBy({ user: { id: userId } });

    if (getUserDiary.length != 0) {
      let returnArr = [];
      getUserDiary.map(e => {
        returnArr.push({ id: e.diary_id, date: e.date });
      });

      return returnArr;
    } else {
      return { ok: false, message: '聞き込みがありまん。' };
    }
  }

  // 画像を保存する
  async saveImage(diary_id: number, source: string) {
    this.diaryRepository.update(diary_id, { source });
  }

  // 評価を保存する
  async saverRating(rate: number, diary_id: number) {
    try {
      await this.diaryRepository.update(diary_id, { rate });
      return 'true';
    } catch (error) {
      console.log(error);
      return 'false';
    }
  }
}
