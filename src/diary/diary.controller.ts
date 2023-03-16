import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { DiarysService } from './diary.service';
import { CreateDiaryDto, CreateDiaryOutput } from './dtos/create-diary.dto';

@Controller('diarys')
export class DiarysController {
  constructor(private diaryService: DiarysService) {}

  // @Get('/:id') //해당 유저의 일기 중에서 생성일자와 보낸 year,month가 일치하는 모든 일기 그림 경로와 id데이터
  // getAllDiaries(@Param('id') id: number) {

  // }

  // @Get('/:id')
  // getDiary(@Param('id') id: number): Promise<Diary> {
  //   return this.diaryService.getDiary();
  // }

  @UseGuards(AccessTokenGuard)
  @Post('')
  @UsePipes(ValidationPipe)
  createDiary(@Body() createDiaryDto: CreateDiaryDto, @Req() req: Request) {
    return this.diaryService.createDiary(createDiaryDto, req);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteDiary(@Param('id') id: number, @Param('userId') userId: number, @Req() req: Request) {
    console.log(req.user);

    return this.diaryService.deleteDiary(id, userId);
  }
}
