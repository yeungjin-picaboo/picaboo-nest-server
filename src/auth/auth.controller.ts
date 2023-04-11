import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';

@Controller('/api')
@ApiTags('User API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: '유저를 생성하는 API', description: '유저 생성' })
  @ApiCreatedResponse({ description: '유저를 생성합니다', type: User })
  async signUp(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    return await this.authService.signUp(createUserDto, res);
  }

  @Post('/login')
  @ApiOperation({ summary: '로그인 하는 API', description: '로그인' })
  @ApiCreatedResponse({ description: '로그인을 합니다.', type: User })
  async signIn(@Body() data: AuthDto, @Res({ passthrough: true }) res: Response) {
    return await this.authService.signIn(data, res);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: '로그아웃 하는 API', description: '로그아웃' })
  @ApiCreatedResponse({ description: '로그아웃을 합니다.', type: User })
  @Get('/logout')
  async logout(@Req() req: Request) {
    return await this.authService.logout(req.user['userId']);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiOperation({ summary: 'AccessToken 인증', description: 'AccessTokenGuard' })
  user(@Req() req: Request) {
    return req.user; //useGuards
  }

  // @Get('/refreshtoken')
  // restoreToken
}
