import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { CreateMoodDto } from 'src/diary/dtos/create-diary.dto';
import { DataSource, Repository } from 'typeorm';
import { SummarizeDto } from './dto/emotion.dto';
import { Diary } from 'src/diary/entities/diary.entity';

@Injectable()
export class EmotionService extends Repository<Diary> {
  constructor(@InjectRepository(Diary) private dataSource: DataSource) {
    super(Diary, dataSource.manager);
  }
  async sentimentTxt(diary: JSON) {
    const client_id = process.env.CLOVA_CLIENT_ID;
    const client_secret = process.env.CLOVA_SECRET;
    const url = process.env.CLOVA_URL;

    const headers = {
      'X-NCP-APIGW-API-KEY-ID': client_id,
      'X-NCP-APIGW-API-KEY': client_secret,
      'Content-Type': 'application/json'
    };

    const title = { title: diary['title'] };
    const content = { content: diary['content'] };
    //  const content = { content: diary['content'] };

    console.log(client_id);
    console.log(client_secret);

    try {
      let test = await axios.post(url, content, { headers });
      console.log(content);
      // const diaryId2 = await this.findOneBy({
      //   id: 1
      // });
      // console.log(diaryId2);
      const diaryId = await this.findOneBy({
        content: content.content
      });

      console.log(diaryId);

      let create = this.create({
        emotion: test.data.document.sentiment
        // emotion: 'positive'
      });

      this.save(create);

      console.log(test.data.document);
      // return test.data.document.sentiment; // 기분을 리턴해준다
      return 'positive';
    } catch (error) {
      console.log(error);
    }
  }
}
