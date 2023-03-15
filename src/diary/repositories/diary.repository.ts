import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { find, identity } from 'rxjs';
import { CustomRepository } from 'src/common/custom-repository.decorator';
import { User } from 'src/users/entities/user.entity';
import { UserRespository } from 'src/users/repositories/user.repository';
import { Repository } from 'typeorm';
import { DeleteDiaryDto } from '../dtos/delete-diary.dto';
import { Diary } from '../entities/diary.entity';

@Injectable()
@CustomRepository(Diary)
export class DiarysRepository {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getAllDiary(page) {
    try {
      const diary = await this.diaryRepository.createQueryBuilder('diary');
    } catch (error) {
      console.error(error);
    }
  }

  // async createDiary({ title, content, year, month, userId }) {
  //   try {
  //     const user = await this.userRepository.findOneBy({ id: userId });
  //     const diary = await this.diaryRepository.save(
  //       this.diaryRepository.create({
  //         title,
  //         content,
  //         year,
  //         month,
  //         user,
  //       }),
  //     );
  //     console.log(diary);
  //     return diary;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // }

  async deleteDiary({ diaryId, userId }) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      const deleteDiary = await this.diaryRepository.delete({ id: diaryId });

      return deleteDiary;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
