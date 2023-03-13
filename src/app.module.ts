import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { typeORMConfig } from './database/typeorm.config';
import { LoggerMiddleware } from './middlewares/logger.middlewares';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DiarysController } from './diary/diary.controller';
import { DiarysModule } from './diary/diary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    UsersModule,
    DiarysModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
