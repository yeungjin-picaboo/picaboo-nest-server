import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Diary } from 'src/diary/entities/diary.entity';
import { User } from 'src/users/entities/user.entity';

// console.log(process.env.DB_NAME);

// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: +process.env.DB_PORT,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   entities: [User, Diary],
//   synchronize: true,
//   // logging: true,
// };
