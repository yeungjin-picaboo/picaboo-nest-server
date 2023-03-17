import { Body, Controller, Post } from '@nestjs/common';
import { GoogleUserService } from './google_user.service';
import { CreateGoogleUserDto } from './dto/create-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('google-user')
@ApiTags('Google Login API')
export class GoogleUserController {
  constructor(private googleUserService: GoogleUserService) {}

  @Post()
  @ApiOperation({ summary: '구글 로그인 API', description: '구글 로그인' })
  @ApiCreatedResponse({ description: '구글 로그인 계정 생성', type: CreateGoogleUserDto })
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
