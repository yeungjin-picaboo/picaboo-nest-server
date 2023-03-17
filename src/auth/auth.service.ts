import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserRespository } from 'src/users/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dtos/auth.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRespository: UserRespository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    try {
      const userExists = await this.userRespository.existsUser(createUserDto.email);
      if (userExists) {
        throw new BadRequestException('This email already exists');
      }

      const nicknameExists = await this.userRespository.existsNickname(createUserDto.nickname);
      if (nicknameExists) {
        throw new BadRequestException('This nickname already exists');
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
      const user = await this.userRespository.existsUser(data.email);
      if (!user) throw new BadRequestException('Check your email.');

      const passwordCheck = await bcrypt.compare(data.password, user.password);

      if (!passwordCheck) throw new BadRequestException('Check your password.');
      const tokens = await this.getTokens({
        userId: user.id
      });
      res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
      return { accessToken: tokens.accessToken };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed Login');
    }
  }

  async getTokens(payload: { userId: number }) {
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
}
