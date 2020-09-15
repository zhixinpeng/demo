import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  async getImageList(): Promise<any> {
    const data = fs.readdirSync('images');
    const url = 'http://localhost:3001/images/';

    return {
      data: data.map(item => ({
        name: item,
        src: url + item,
        id: uuid(),
      })),
      status: 0,
    };
  }

  async addImage(body): Promise<any> {
    const { imageBase64, name } = body;
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const dataBuffer = Buffer.from(base64Data, 'base64');
    try {
      fs.writeFileSync(`images/${name}`, dataBuffer);
      return {
        status: 996,
      };
    } catch (error) {
      return {
        status: 0,
      };
    }
  }

  async deleteImage(name: string): Promise<any> {
    const files = fs.readdirSync('images');
    const target = files.filter(item => item === name);
    if (target) {
      fs.unlinkSync('images/' + target);
      return {
        status: 0,
      };
    }
    return {
      status: 996,
    };
  }
}
