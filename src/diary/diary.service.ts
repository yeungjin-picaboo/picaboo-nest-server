import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDiaryDto, CreateDiaryOutput } from './dtos/create-diary.dto';
import { DeleteDiaryDto } from './dtos/delete-diary.dto';
import { DiarysRepository } from './repositories/diary.repository';

@Injectable()
export class DiarysService {
  constructor(private readonly diaryRepository: DiarysRepository) {}

  getAllDiary() {}

  // async getDiary(id: number): Promise<Diary> {
  // const found = await this.diaryRepository.findOne(id);

  // if (!found) {
  //   throw new NotFoundException(`Cant't find Diary with id ${id}`);
  // }

  // return found;
  // }

  async createDiary(
    createDiaryDto: CreateDiaryDto,
    user,
  ): Promise<CreateDiaryOutput> {
    try {
      await this.diaryRepository.createDiary(
        {
          ...createDiaryDto,
        },
        user,
      );
      console.log('Created Diary');
      return {
        ok: true,
      };
    } catch (error) {
      console.error('Failed');
      return {
        ok: false,
      };
    }
  }

  // async deleteDiary(id:number, user):Promise<DeleteDiaryDto>{
  //   try {
  //     const diary = await this.deleteDiary.
  //   } catch (error) {

  //   }
  // }
}
