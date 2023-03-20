import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';

@Controller('auth')
@ApiTags('User API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: '유저를 생성하는 API', description: '유저 생성' })
  @ApiCreatedResponse({ description: '유저를 생성합니다', type: User })
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: '로그인 하는 API', description: '로그인' })
  @ApiCreatedResponse({ description: '로그인을 합니다.', type: User })
  signIn(@Body() data: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signIn(data, res);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiOperation({ summary: 'AccessToken 인증', description: 'AccessTokenGuard' })
  user(@Req() req: Request) {
    return req.user; //useGuards
  }
}
