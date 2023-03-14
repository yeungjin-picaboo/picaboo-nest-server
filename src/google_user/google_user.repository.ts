import { DataSource, Repository } from 'typeorm';
import { GoogleUser } from './entities/google_user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGoogleUserDto } from './dto/create-user.dto';

export class GoggleUserRepository extends Repository<GoogleUser> {
	constructor(@InjectRepository(GoogleUser) private dataSource: DataSource) {
		super(GoogleUser, dataSource.manager);
	}

	async createGoogleUser(createGoogleUserDto: CreateGoogleUserDto) {
		const { email, nick_name } = createGoogleUserDto;
		console.log(createGoogleUserDto);
		const googleUser = this.create({
			email,
			nick_name,
		});

		await this.save(googleUser);

		return googleUser;
	}
}
