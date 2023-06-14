import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersInfoRepository } from './repositories/users-info.repository';

@Injectable()
export class UsersInfoService {
  constructor(private readonly usersInfoRepository: UsersInfoRepository) {}

  async showUsersRating(req: Request) {
    const userId = req.user['userId'];
    console.log(userId);
    return this.usersInfoRepository.showUsersRating(userId);
  }
}
