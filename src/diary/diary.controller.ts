import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { Request } from 'express';
import { clearConfigCache } from 'prettier';
import { generate } from 'rxjs';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { GetWeatherDto } from 'src/weather-mood/dto/weahter.dto';
import { WeatherService } from 'src/weather-mood/weather-mood.service';
import { DiarysService } from './diary.service';
import { CreateDiaryDto, DiaryDto, WeatherEmotion } from './dtos/create-diary.dto';
import { UpdateDiaryDto } from './dtos/update-diary.dto';
import { Diary } from './entities/diary.entity';

interface test {
  content: string;
  latitude: string;
  longitude: string;
}

@Controller('api/diary')
@ApiTags('Diary API')
export class DiarysController {
  constructor(private diaryService: DiarysService, private weatherService: WeatherService) {}
  @UseGuards(AccessTokenGuard)
  @Post('/meta')
  // @ApiOperation({ summary: '감정,위도,경도', description: '위도경도감정' })
  // @ApiCreatedResponse({ description: '날씨 감정' })
  async summarizeDiary(@Body() dto: test): Promise<any> {
    const emotion = await this.diaryService.getEmotion(dto.content);
    const weather = await this.weatherService.getWeather(dto.latitude, dto.longitude);

    return { emotion, weather };
  }

  @UseGuards(AccessTokenGuard)
  @Get('dates')
  async getDiariesList(@Req() req: Request) {
    return this.diaryService.getCalendarDiary(req.user['userId']);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  @ApiOperation({ summary: '일기 상세정보 API', description: '일기 상세정보 보기' })
  @ApiCreatedResponse({ description: '내가 선택한 일기 상세정보를 봅니다.', type: Diary })
  getDiary(@Param('id') diaryId: number, @Req() req: Request) {
    return this.diaryService.getDiary(diaryId, req.user['userId']);
  }
  // @UseGuards(AccessTokenGuard)
  // @G
  // 전체일기 중 클릭했을때 일기id와 일치하는 데이터 모두 얻기
  // res data -> {diary_id: “”, title: “”, content: “”, weather: “”, emotion: “”, source: “”, date: “”}

  // 전체일기보기
  // 유저의 일기 중 생성일자와 보낸 year, month가 일치하는 모든 일기 그림 경로와 id데이터 가져오기
  // res data -> [{diary_id: “”, source: “”},{diary_id: “”, source: “”},
  @UseGuards(AccessTokenGuard)
  @Get('/years/:year/months/:month')
  @ApiOperation({ summary: '일기 전체정보 API', description: '일기 전체정보 보기' })
  @ApiCreatedResponse({
    description: '내가 작성한 전체일기를 년도, 월별로 확인할 수 있습니다.',
    type: Diary
  })
  getAllDiary(
    @Param('year') year: number,
    @Param('month') month: string,

    @Req() req: Request
  ) {
    return this.diaryService.getAllDiary(req.user['userId'], year, month);
  }

  @UseGuards(AccessTokenGuard)
  @Post('')
  @ApiOperation({ summary: '일기 작성 API', description: '일기 작성하기' })
  @ApiCreatedResponse({ description: '일기를 작성합니다.', type: Diary })
  @UsePipes(ValidationPipe)
  async createDiary(@Body() createDiaryDto: CreateDiaryDto, @Req() req: Request) {
    // console.log(createDiaryDto);
    const diary = await this.diaryService.createDiary(createDiaryDto, req);
    const source = await this.diaryService.createImage(diary.content);
    await this.diaryService.saveImage(diary.id, source);
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
}
