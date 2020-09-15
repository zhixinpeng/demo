import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('image')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  async getImageList() {
    return await this.appService.getImageList();
  }

  @Post('add')
  async addImage(@Body() body) {
    return await this.appService.addImage(body);
  }

  @Get('delete')
  async deleteImage(@Query() query) {
    return await this.appService.deleteImage(query.name);
  }
}
