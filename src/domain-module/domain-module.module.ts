import { Module } from '@nestjs/common';
import { SharedRepository } from './shared-repository/getIdByContent.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary } from 'src/diary/entities/diary.entity';

export interface SharedRepositoryInterface {
  getIdByContent(): Promise<number>;
}

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  providers: [SharedRepository],
  exports: [SharedRepository]
})
export class DomainModuleModule {}
