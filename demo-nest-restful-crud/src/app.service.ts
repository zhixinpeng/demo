import { Injectable } from '@nestjs/common';

// 被 @Injectable 修饰的类，可以通过其构造函数完成依赖注入，但依赖注入的类必须与当前类属于同一模块
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
