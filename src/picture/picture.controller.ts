import { Body, Controller, Post } from '@nestjs/common';
import { PictureService } from './picture.service';
import { CreatePictureDto } from './dto/create_picture.dto';

@Controller('picture')
export class PictureController {
  constructor(private readonly createPictureService: PictureService) {}

  @Post('create')
  async createPicture(@Body() createPictureDto: CreatePictureDto): Promise<String> {
    return await this.createPictureService.createPicture(createPictureDto);
  }
}
