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
    return this.userInfoService.showUsersRating(req);
  }
}
