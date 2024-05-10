import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptors } from './interceptors/transform.interceptors';
import { AllExceptionsFilter } from './filters/all-expection.filter';

// session
import * as session from 'express-session';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 开启Cors
  app.enableCors({ origin: 'http://localhost:8080', credentials: true });
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptors());
  // 全局注册错误过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());
  // 定义Session
  app.use(
    session({
      secret: 'hello.lab_manage_sys.hyy',
      resave: false,
      saveUninitialized: false,
      rolling: true,
    }),
  );
  // 全局配置 ValidationPipe进行自动验证
  app.useGlobalPipes(
    new ValidationPipe({
      // 这里可以设置 ValidationPipe 的配置选项
      whitelist: true, // 是否只保留 DTO 中定义的属性
      forbidNonWhitelisted: true, // 是否禁止非 DTO 中定义的属性
      // 其他配置...
    }),
  );
  // 全局注册错误过滤器
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
