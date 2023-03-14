import { Module } from '@nestjs/common';
import { GoogleUserController } from './google_user.controller';
import { GoogleUserService } from './google_user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleUser } from './entities/google_user.entity';
import { GoggleUserRepository } from './google_user.repository';

@Module({
	imports: [TypeOrmModule.forFeature([GoogleUser])],
	controllers: [GoogleUserController],
	providers: [GoogleUserService, GoggleUserRepository],
})
export class GoogleUserModule {}
