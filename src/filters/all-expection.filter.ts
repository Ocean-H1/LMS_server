/**
 * @Description: 异常过滤器
 * @Author: OceanH
 */
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';

// 负责捕获HttpException类的实例
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException && exception.getStatus() === 400) {
      // 提取错误信息
      const errors = (exception.getResponse() as any).message || [];

      response.status(400).json({
        statusCode: 400,
        timestamp: moment().format('yyyy-MM-DD HH:mm:ss'),
        message: 'Validation failed',
        errors, // 返回具体的验证错误详情
      });
    } else {
      // 对于其他类型的异常，就返回通用的错误信息
      response
        .status(
          exception instanceof HttpException ? exception.getStatus() : 500,
        )
        .json({
          statusCode:
            exception instanceof HttpException ? exception.getStatus() : 500,
          timestamp: moment().format('yyyy-MM-DD HH:mm:ss'),
          message: (exception as any).message || 'Internal server error',
        });
    }
  }
}
