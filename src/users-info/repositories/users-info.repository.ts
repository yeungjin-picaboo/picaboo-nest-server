import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { Diary } from 'src/diary/entities/diary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersInfoRepository {
  constructor(@InjectRepository(Diary) private readonly diaryRepository: Repository<Diary>) {}

  async showUsersRating(userId) {
    try {
      const highestRatingColumn = await this.diaryRepository
        .createQueryBuilder('diary')
        .select('diary.columnName')
        .addSelect('MAX(diary.starRating)', 'maxRating')
        .where('diary.userId = :userId', { userId: userId })
        .groupBy('diary.mood')
        .getRawMany();

      if (!highestRatingColumn) {
        return 'You must make diary and rating';
      }
      console.log(highestRatingColumn);
      return highestRatingColumn;
    } catch (error) {}
  }
}
