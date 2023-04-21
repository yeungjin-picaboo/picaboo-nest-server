import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeORMConfig } from './database/typeorm.config';
import { LoggerMiddleware } from './middlewares/logger.middlewares';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DiarysModule } from './diary/diary.module';
import { Diary } from './diary/entities/diary.entity';
import { User } from './users/entities/user.entity';
import { PictureModule } from './picture/picture.module';
import { GoogleUserModule } from './google_user/google_user.module';
import { createPicture } from './picture/entities/create_picture.entity';
import { DomainModuleModule } from './domain-module/domain-module.module';
import { GoogleUser } from './google_user/entities/google_user.entity';
import { WeatherModule } from './weather-mood/weather-mood.module';
import { QnaModule } from './qna/qna.module';
import { Qna } from './qna/entities/qna.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Diary, GoogleUser, createPicture, Qna],
      // "entities: [__dirname + '/**/*.entity{.ts,.js}'],"
      synchronize: true
      // logging: true,
    }),
    AuthModule,
    UsersModule,
    DiarysModule,
    GoogleUserModule,
    WeatherModule,
    PictureModule,
    DomainModuleModule,
    QnaModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
