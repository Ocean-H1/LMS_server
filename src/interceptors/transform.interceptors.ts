/**
 * @Description: 统一成响应数据格式
 * @Author: OceanH
 */
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptors implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        // return {
        //   code: 200,
        //   data,
        //   message: 'success',
        // };
        return data;
      }),
    );
  }
}
