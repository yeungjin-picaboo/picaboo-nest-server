import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/common/custom-repository.module';
import { User } from 'src/users/entities/user.entity';
import { UserRespository } from 'src/users/repositories/user.repository';
import { DiarysController } from './diary.controller';
import { DiarysService } from './diary.service';
import { Diary } from './entities/diary.entity';
import { DiarysRepository } from './repositories/diary.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Diary, User]),
    TypeOrmExModule.forCustomRepository([UserRespository]),
  ],
  providers: [DiarysService, DiarysRepository],
  controllers: [DiarysController],
  exports: [DiarysRepository],
})
export class DiarysModule {}
