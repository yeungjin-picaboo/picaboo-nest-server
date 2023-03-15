import { Injectable } from '@nestjs/common';
import { create_picture } from './entities/create_picture.entity';
import { DataSource, Repository } from 'typeorm';
import { CreatePictureDto } from './dto/create_picture.dto';
import { exec } from 'child_process';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PictureService extends Repository<create_picture> {
  constructor(@InjectRepository(create_picture) private dataSource: DataSource) {
    super(create_picture, dataSource.manager);
  }
  async createPicture(createPictureDto: CreatePictureDto): Promise<String> {
    // : Promise<create_picture>
    const { title, user_email, user_name } = createPictureDto;

    exec(`./test.sh "${user_name}" "${title}"`);
    // After excecute this fucnction,

    const lastDir = fs.readdirSync(`${process.env.PUBLIC_LINK}${user_name}`, 'utf-8');
    const lastFile = lastDir[lastDir.length - 1];

    const picture_url = `${process.env.PUBLIC_LINK}${user_name}` + lastFile;
    
    console.log(__dirname + `${user_name}`);
    console.log(process.env.DB_USERNAME);
    const create_picture = this.create({
      title,
      user_email,
      user_name,
      picture_url
    });
    this.save(create_picture);
    return 'Success';
  }
}
