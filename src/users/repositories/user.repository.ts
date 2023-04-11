import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRepository } from 'src/common/custom-repository.decorator';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
@CustomRepository(User)
export class UserRespository {
  constructor(
    @InjectRepository(User)
    private userRespository: Repository<User>
  ) {}

  async existsUser(email) {
    try {
      const exists = await this.userRespository.findOneBy({ email });
      return exists;
    } catch (error) {
      console.error(error);

      throw new BadRequestException('Exists User');
    }
  }

  async findUserById(id) {
    try {
      const exists = await this.userRespository.findOneBy({ id });
      return exists;
    } catch (error) {
      console.error(error);

      throw new BadRequestException('Exists User');
    }
  }

  async existsNickname(nickname) {
    try {
      const exists = await this.userRespository.findOneBy({ nickname });
      return exists;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Exists Nickname');
    }
  }

  async refreshToken(id, refreshToken) {
    const refresh = await this.userRespository.save(
      this.userRespository.create({ id, refreshToken })
    );
    return refresh;
  }

  async createUser(email, password, nickname) {
    try {
      const user = await this.userRespository.save(
        this.userRespository.create({ email, password, nickname })
      );
      console.log(user);
      return user;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Create User error');
    }
  }
}
