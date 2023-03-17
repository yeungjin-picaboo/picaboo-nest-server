import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { find, identity } from 'rxjs';
import { CustomRepository } from 'src/common/custom-repository.decorator';
import { User } from 'src/users/entities/user.entity';
import { UserRespository } from 'src/users/repositories/user.repository';
import { Repository } from 'typeorm';
import { DeleteDiaryDto } from '../dtos/delete-diary.dto';
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
      const diaries = await this.diaryRepository.findBy({ user: { id: userId }, year, month });
      console.log(diaries);

      if (!diaries) {
        return 'nothing';
      }
      return diaries;
    } catch (error) {
      console.error(error);
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
      //비교하고
      const diary = await this.diaryRepository.findOneBy({ id: diaryId, user: { id: userId } });
      console.log(diary);

      if (!diary) {
        return 'error ----';
      }

      return diary;
    } catch (error) {
      return error;
    }
  }

  async createDiary({ title, content, year, month, userId }) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      const diary = await this.diaryRepository.save(
        this.diaryRepository.create({
          title,
          content,
          year,
          month,
          user
        })
      );
      console.log(diary);
      return diary;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateDiary(diaryId, updateDiaryDto: UpdateDiaryDto, userId) {
    try {
      console.log({ id: diaryId, user: { id: userId } });
      const diary = await this.diaryRepository.findOneBy({ id: diaryId, user: { id: userId } });
      console.log(diary, '111');

      if (!diary) {
        console.log(diary, '222');
        return false;
      }
      console.log(diary, '333');
      return this.diaryRepository.save({
        id: diaryId,
        ...updateDiaryDto
      });
    } catch (error) {
      return error;
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
