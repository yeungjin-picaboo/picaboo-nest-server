import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { create_picture } from './entities/create_picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([create_picture])],
  controllers: [PictureController],
  providers: [PictureService]
})
export class PictureModule {}
