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
    private readonly userRespository: UserRespository, // userRepository 注射
    private readonly jwtService: JwtService, // jwtService 注射
    private readonly configService: ConfigService // configService 注射
  ) {}

  // 사용자 등록을 위한 메소드
  async signUp(createUserDto: CreateUserDto, res: Response): Promise<any> {
    try {
      // 이메일이 이미 사용 중인지 체크
      const userExists = await this.userRespository.existsUser(createUserDto.email);
      if (userExists) {
        throw new BadRequestException('Email already exists');
      }

      // 닉네임이 이미 사용 중인지 체크
      const nicknameExists = await this.userRespository.existsNickname(createUserDto.nickname);
      if (nicknameExists) {
        throw new BadRequestException('Nickname already exists');
      }

      // 패스워드를 암호화
      const hash = await bcrypt.hash(createUserDto.password, 10);
      const { email, nickname } = createUserDto;

      // 사용자 생성
      await this.userRespository.createUser(email, hash, nickname);
      return { message: 'Success Create user!' };
    } catch (error) {
      throw new BadRequestException('Error Signup');
    }
  }

  // 사용자 로그인을 위한 메소드
  async signIn(data: AuthDto, res: Response): Promise<any> {
    try {
      const user = await this.userRespository.existsUser(data.email);
      if (!user) throw new BadRequestException('Check your email.');

      // 패스워드 일치 확인
      const passwordCheck = await bcrypt.compare(data.password, user.password);

      if (!passwordCheck) throw new BadRequestException('Check your password.');
      const tokens = await this.getTokens({
        userId: user.id,
        nickname: user.nickname
      });

      return { accessToken: tokens.accessToken };
    } catch (error) {
      throw new BadRequestException('Failed Login');
    }
  }

  // 사용자 로그아웃을 위한 메소드
  async logout(userId) {
    const removeRefreshToken = await this.userRespository.refreshToken(userId, null);
    if (!removeRefreshToken.refreshToken) {
      return { message: 'Success' };
    }
    return { message: 'failed' };
  }

  // 토큰 생성을 위한 메소드
  async getTokens(payload: { userId: number; nickname: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 15,
        secret: this.configService.get('JWT_ACCESS_SECRET')
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 60 * 24 * 7,
        secret: this.configService.get('JWT_REFRESH_SECRET')
      })
    ]);

    return { accessToken, refreshToken };
  }

  // 액세스 토큰 갱신을 위한 메소드
  async updateAccessToken(req: Request) {
    const verifyedUser = this.jwtService.verify(req.cookies.refresh_token, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET')
    });

    const user = await this.userRespository.existsUser(verifyedUser['userId']);
    return {
      accessToken: await this.jwtService.signAsync(
        { userId: user.id },
        {
          expiresIn: 60 * 15 * 2,
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

  // 리프레시 토큰 갱신을 위한 메소드
  async updateRefreshToken(userId: string, refreshToken: string) {
    await this.userRespository.refreshToken(userId, refreshToken);
  }
}
