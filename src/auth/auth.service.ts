import { BadRequestException, HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserRespository } from 'src/users/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dtos/auth.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRespository: UserRespository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async signUp(createUserDto: CreateUserDto, res: Response): Promise<any> {
    try {
      const userExists = await this.userRespository.existsUser(createUserDto.email);
      if (userExists) {
        throw new BadRequestException('Email already exists');
      }

      const nicknameExists = await this.userRespository.existsNickname(createUserDto.nickname);
      if (nicknameExists) {
        throw new BadRequestException('Nickname already exists');
      }

      const hash = await bcrypt.hash(createUserDto.password, 10);
      const { email, nickname } = createUserDto;

      await this.userRespository.createUser(email, hash, nickname);
      return { message: 'Success Create user!' };
    } catch (error) {
      throw new BadRequestException('Error Signup');
    }
  }

  async signIn(data: AuthDto, res: Response): Promise<any> {
    try {
      console.log(data.email);
      const user = await this.userRespository.existsUser(data.email);
      if (!user) throw new BadRequestException('Check your email.');

      const passwordCheck = await bcrypt.compare(data.password, user.password);

      if (!passwordCheck) throw new BadRequestException('Check your password.');
      const tokens = await this.getTokens({
        userId: user.id,
        nickname: user.nickname
      });
      console.log(tokens);
      // res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
      return { accessToken: tokens.accessToken };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed Login');
    }
  }

  async logout(userId) {
    const removeRefreshToken = await this.userRespository.refreshToken(userId, null);
    if (!removeRefreshToken.refreshToken) {
      return { message: 'Success' };
    }
    return { message: 'failed' };
  }

  async getTokens(payload: { userId: number; nickname: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 15 * 24,
        secret: this.configService.get('JWT_ACCESS_SECRET')
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 60 * 24 * 7,
        secret: this.configService.get('JWT_REFRESH_SECRET')
      })
    ]);

    return { accessToken, refreshToken };
  }

  //다시 재발급해줄떄
  async updateAccessToken(req: Request) {
    //인증 나다
    const verifyedUser = this.jwtService.verify(req.cookies.refresh_token, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET')
    });
    console.log(verifyedUser);

    const user = await this.userRespository.existsUser(verifyedUser['userId']);
    return {
      accessToken: await this.jwtService.signAsync(
        { userId: user.id },
        {
          expiresIn: 60 * 15 * 24,
          secret: this.configService.get('JWT_ACCESS_SECRET')
        }
      ),
      refreshToken: await this.jwtService.signAsync(
        { userId: user.id },
        {
          expiresIn: 60 * 60 * 24 * 7,
          secret: this.configService.get('JWT_REFRESH_SECRET')
        }
      )
    };
  }

  //리프레시토큰이 완료됐을때, 다시 재발급받을때
  async updateRefreshToken(userId: string, refreshToken: string) {
    await this.userRespository.refreshToken(userId, refreshToken);
  }
}
