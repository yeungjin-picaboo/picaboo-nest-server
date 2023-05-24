import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { UsersInfoService } from './users-info.service';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@Controller('api/users-info')
export class UsersInfoController {
  constructor(private userInfoService: UsersInfoService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/')
  async getIdenticon(@Req() req: Request) {
    console.log(req.user['userId']);
    // return this.userInfoService.showUsersRating(req);
    return [
      {
        diary_id: 24,
        title: 'cheese cake',
        content: 'i ate cheese cake so i feel happy',
        date: '2023-05-18',
        mood: 'happy',
        weather: 'cloudy',
        source: 'df1bfc63-a6a7-444f-ba3e-3a000addf813.png',
        rate: 3.5
      },
      {
        diary_id: 25,
        title: 'cheese cake',
        content: 'i ate cheese cake so i feel happy',
        date: '2023-05-12',
        mood: 'bad',
        weather: 'sunny',
        source: 'c12c1c0f-1074-4616-9f74-047f51a4a5ad.png',
        rate: 2.5
      },
      {
        diary_id: 26,
        title: 'cheese cake',
        content: 'i ate cheese cake so i feel happy',
        date: '2023-04-02',
        mood: 'good',
        weather: 'windy',
        source: '16.jpg',
        rate: 4
      },
      {
        diary_id: 26,
        title: 'cheese cake',
        content: 'i ate cheese cake so i feel happy',
        date: '2023-05-13',
        mood: 'sad',
        weather: 'windy',
        source: 'img2.jpg',
        rate: 4.5
      },
      {
        diary_id: 26,
        title: 'cheese cake',
        content: 'i ate cheese cake so i feel happy',
        date: '2023-05-13',
        mood: 'netural',
        weather: 'windy',
        source: 'bb36390f-2e23-4a49-be87-03650a7258ac.png',
        rate: 5
      }
    ];
  }
}
