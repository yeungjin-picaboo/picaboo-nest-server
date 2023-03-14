import { Injectable } from '@nestjs/common';
import { GoogleUser } from './entities/google_user.entity';
import { GoggleUserRepository } from './google_user.repository';
import { CreateGoogleUserDto } from './dto/create-user.dto';

@Injectable()
export class GoogleUserService {
	constructor(private googleUserRepository: GoggleUserRepository) {}

	createUser(
		createGoogleUserDto: CreateGoogleUserDto,
	): Promise<CreateGoogleUserDto> {
		return this.googleUserRepository.createGoogleUser(createGoogleUserDto);
	}
}
