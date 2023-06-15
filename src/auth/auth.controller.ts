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
  @ApiOperation({ summary: 'ユーザーを生成するAPI', description: 'ユーザーを生成' })
  @ApiCreatedResponse({ description: 'ユーザーを作成します', type: User })
  async signUp(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    return await this.authService.signUp(createUserDto, res);
  }

  @Post('/login')
  @ApiOperation({ summary: 'ログインをするAPI', description: 'ログイン' })
  @ApiCreatedResponse({ description: 'ログインします。.', type: User })
  async signIn(@Body() data: AuthDto, @Res({ passthrough: true }) res: Response) {
    return await this.authService.signIn(data, res);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'ログアウトするAPI', description: 'ログアウト' })
  @ApiCreatedResponse({ description: 'ログアウトをします.', type: User })
  @Get('/logout')
  async logout(@Req() req: Request) {
    return await this.authService.logout(req.user['userId']);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiOperation({ summary: 'AccessToken 認証', description: 'AccessTokenGuard' })
  user(@Req() req: Request) {
    return req.user; //useGuards
  }

  // @Get('/refreshtoken')
  // restoreToken
}
