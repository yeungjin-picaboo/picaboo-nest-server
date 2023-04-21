import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    private readonly diaryRepository: Repository<Diary>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getAllDiary(userId, date) {
    try {
      console.log(JSON.stringify(date));
      console.log(`${date}-%`);
      const query = await this.diaryRepository
        .createQueryBuilder('diary')
        .where(`diary.date LIKE :datePattern`, { datePattern: `${date}-%` })
        .andWhere(`diary.userId = :userId`, { userId })
        .orderBy({ id: 'ASC' })
        .getMany();

      if (!query) {
        return 'You dont have diary';
      }
      return query;
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

  async createDiary({ title, content, emotion, weather, date, userId }) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      const diary = await this.diaryRepository.save(
        this.diaryRepository.create({
          title,
          content,
          emotion,
          weather,
          date,
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

  // async getDiaryList({ userId }) {
  //   // user의 전체 다이어리 리스트를 보여주면 됨.
  //   const getDiaryList = await this.diaryRepository.findOne({});
  // }

  async getCalendarDiary(userId) {
    // miniCalendar
    console.log(userId);
    const getUserDiary = await this.diaryRepository.findBy({ user: { id: userId } });
    console.log('userDiary', getUserDiary);
    if (getUserDiary.length != 0) {
      // not empty
      let returnArr = [];
      let sortingArr = []; // 정렬해서 보내줄
      getUserDiary.map(e => {
        // sortingArr.push(Number(e.date.split('-')[2]));
        returnArr.push({ id: e.id, date: e.date });
      });
      // returnArr.sort((a, b) => a.id - b.id);

      // console.log(returnArr);
      return returnArr;
    } else {
      return { ok: false, message: '작성한 글이 없습니다.' };
    }
  }
}
