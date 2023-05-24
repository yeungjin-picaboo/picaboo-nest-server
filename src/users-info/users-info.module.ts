import { Module } from '@nestjs/common';
import { UsersInfoController } from './users-info.controller';
import { UsersInfoService } from './users-info.service';
import { UsersInfoRepository } from './repositories/users-info.repository';
import { DiarysRepository } from 'src/diary/repositories/diary.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary } from 'src/diary/entities/diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  controllers: [UsersInfoController],
  providers: [UsersInfoService, UsersInfoRepository]
})
export class UsersInfoModule {}
