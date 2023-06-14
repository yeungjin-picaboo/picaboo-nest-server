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
      const subQuery = this.diaryRepository
        .createQueryBuilder('diary')
        .select('emotion, MAX(rate)', 'maxRate')
        .groupBy('emotion')
        .getQuery();
      console.log(subQuery);
      const query = await this.diaryRepository
        .createQueryBuilder('diary')
        // .select('diary.*')
        .select([
          'diary.diary_id',
          'diary.emotion',
          'diary.rate',
          'diary.title',
          'diary.content',
          'diary.date',
          'diary.source',
          'diary.weather'
        ])
        .where('diary.userId = :userId', { userId })
        .andWhere('(diary.emotion, diary.rate) IN (' + subQuery + ')')
        .getRawMany();

      if (!query) {
        return 'You must make diary and rating';
      }

      return query;
    } catch (error) {}
  }
}
