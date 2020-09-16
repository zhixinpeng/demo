import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    // 创建应用实例，此时所有被 AppModule 导入的其他模块的所有实例都会被加载
    const app = await NestFactory.create(AppModule);
    // 使用 3000 端口监听应用程序
    await app.listen(3000);
}

// 启动应用程序
bootstrap();
