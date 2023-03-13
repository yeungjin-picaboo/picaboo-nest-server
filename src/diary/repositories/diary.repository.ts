import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { CustomRepository } from 'src/common/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Diary } from '../entities/diary.entity';

@Injectable()
@CustomRepository(Diary)
export class DiarysRepository {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
  ) {}
  async getAllDiary(page) {
    try {
      const diary = await this.diaryRepository.createQueryBuilder('diary');
    } catch (error) {
      console.error(error);
    }
  }

  async createDiary({ title, content, year, month }, userId) {
    try {
      const diary = await this.diaryRepository.save(
        this.diaryRepository.create({
          title,
          content,
          year,
          month,
          user: userId,
        }),
      );
      console.log(diary);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteDiary(id: number) {
    try {
      await this.diaryRepository.delete({ id });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
