import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersInfoRepository } from './repositories/users-info.repository';

@Injectable()
export class UsersInfoService {
  constructor(private readonly usersInfoRepository: UsersInfoRepository) {}

  async showUsersRating(req: Request) {
    console.log(req.user);
    const userId = req.user['id'];
    console.log(userId);
    return this.usersInfoRepository.showUsersRating(userId);
  }
}
