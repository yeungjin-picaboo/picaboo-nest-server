import { Body, Controller, Post } from '@nestjs/common';
import { GoogleUserService } from './google_user.service';
import { CreateGoogleUserDto } from './dto/create-user.dto';

@Controller('google-user')
export class GoogleUserController {
  constructor(private googleUserService: GoogleUserService) {}

  @Post()
  createGoogleUser(@Body() createGoogleUserDto: CreateGoogleUserDto): Promise<CreateGoogleUserDto> {
    console.log('createGoogleUser called');
    return this.googleUserService.createUser(createGoogleUserDto);
  }
  @Post('/testUrl')
  test(@Body() any: any) {
    console.log('calling');
    return 'hi';
  }
}
