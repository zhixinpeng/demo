import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { ErrorsInterceptor } from './common/errors.interceptor';

@Module({
    imports: [TypeOrmModule.forRoot(), CatModule],
    // 当前模块的控制器集合
    controllers: [AppController],
    // 当前模块的提供者集合
    providers: [AppService, {
        provide: APP_INTERCEPTOR,
        useClass: ErrorsInterceptor
    }],
})
export class AppModule {}
