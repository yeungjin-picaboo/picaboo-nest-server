import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { find, identity } from 'rxjs';
import { CustomRepository } from 'src/common/custom-repository.decorator';
import { User } from 'src/users/entities/user.entity';
import { UserRespository } from 'src/users/repositories/user.repository';
import { Repository } from 'typeorm';
import { UpdateDiaryDto } from '../dtos/update-diary.dto';
import { Diary } from '../entities/diary.entity';

@Injectable()
@CustomRepository(Diary)
export class DiarysRepository {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getAllDiary(userId, year, month) {
    try {
      const diaries = await this.diaryRepository.findBy({ user: { id: userId } });

      if (!diaries) {
        return 'You dont have diary';
      }
      return diaries;
    } catch (error) {
      console.error(error, 'Failed get diaries');
    }
  }

  /**
   *
   * @param diaryId
   * @param userId
   * @returns
   */

  async getDiary(diaryId, userId) {
    try {
      const diary = await this.diaryRepository.findOneBy({ id: diaryId, user: { id: userId } });

      if (!diary) {
        return 'You dont have diary';
      }
      return diary;
    } catch (error) {
      return false;
    }
  }

  async createDiary({ title, content, userId }) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      const diary = await this.diaryRepository.save(
        this.diaryRepository.create({
          title,
          content,
          user
        })
      );
      console.log(diary);
      return diary;
    } catch (error) {
      return false;
    }
  }

  async updateDiary(diaryId, updateDiaryDto: UpdateDiaryDto, userId) {
    try {
      const diary = await this.diaryRepository.findOneBy({ id: diaryId, user: { id: userId } });

      if (!diary) {
        return false;
      }

      return this.diaryRepository.save({
        id: diaryId,
        ...updateDiaryDto
      });
    } catch (error) {
      return false;
    }
  }

  async deleteDiary({ diaryId, userId }) {
    const deleteDiary = await this.diaryRepository.delete({ id: diaryId, user: { id: userId } });
    if (deleteDiary.affected === 0) {
      return false;
    }
    return deleteDiary;
  }
}
