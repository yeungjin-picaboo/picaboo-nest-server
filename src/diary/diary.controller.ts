import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { DiarysService } from './diary.service';
import { CreateDiaryDto } from './dtos/create-diary.dto';
import { UpdateDiaryDto } from './dtos/update-diary.dto';
import { Diary } from './entities/diary.entity';

@Controller('diarys')
@ApiTags('Diary API')
export class DiarysController {
  constructor(private diaryService: DiarysService) {}

  // 전체일기 중 클릭했을때 일기id와 일치하는 데이터 모두 얻기
  // res data -> {diary_id: “”, title: “”, content: “”, weather: “”, emotion: “”, source: “”, date: “”}
  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  @ApiOperation({ summary: '일기 상세정보 API', description: '일기 상세정보 보기' })
  @ApiCreatedResponse({ description: '내가 선택한 일기 상세정보를 봅니다.', type: Diary })
  getDiary(@Param('id') diaryId: number, @Req() req: Request) {
    return this.diaryService.getDiary(diaryId, req.user['userId']);
  }

  // 전체일기보기
  // 유저의 일기 중 생성일자와 보낸 year, month가 일치하는 모든 일기 그림 경로와 id데이터 가져오기
  // res data -> [{diary_id: “”, source: “”},{diary_id: “”, source: “”}, …]
  @UseGuards(AccessTokenGuard)
  @Get('/years/:year/months/:month')
  @ApiOperation({ summary: '일기 전체정보 API', description: '일기 전체정보 보기' })
  @ApiCreatedResponse({
    description: '내가 작성한 전체일기를 년도, 월별로 확인할 수 있습니다.',
    type: Diary
  })
  getAllDiary(@Param('year') year: number, @Param('month') month: string, @Req() req: Request) {
    return this.diaryService.getAllDiary(req.user['userId'], year, month);
  }

  @UseGuards(AccessTokenGuard)
  @Post('')
  @ApiOperation({ summary: '일기 작성 API', description: '일기 작성하기' })
  @ApiCreatedResponse({ description: '일기를 작성합니다.', type: Diary })
  @UsePipes(ValidationPipe)
  createDiary(@Body() createDiaryDto: CreateDiaryDto, @Req() req: Request) {
    // return this.diaryService.createDiary(createDiaryDto, req);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  @ApiOperation({ summary: '일기 삭제 API', description: '일기 삭제하기' })
  @ApiCreatedResponse({ description: '일기를 삭제합니다.', type: Diary })
  async deleteDiary(@Param('id') id: number, @Req() req: Request) {
    return this.diaryService.deleteDiary(id, req.user['userId']);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  @ApiOperation({ summary: '일기 수정 API', description: '일기 수정하기' })
  @ApiCreatedResponse({ description: '일기를 수정합니다.', type: Diary })
  async updateDiary(
    @Param('id') diaryId: number,
    @Body() updateDiaryDto: UpdateDiaryDto,
    @Req() req: Request
  ) {
    console.log(updateDiaryDto);
    return this.diaryService.updateDiary(diaryId, req.user['userId'], updateDiaryDto);
  }

  @Get("diaries/diaries-list")
  async getDiariesList(@Req() req: Request){
    return
  }
}
