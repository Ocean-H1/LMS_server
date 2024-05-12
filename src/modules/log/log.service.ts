import { resultError, resultSuccess } from '@/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { Repository } from 'typeorm';
import { Log } from '@/entities/logs.entity';

@Injectable()
export class LogService {
  constructor(@InjectRepository(Log) private logRepo: Repository<Log>) {}

  async upload(param: CreateLogDto, req) {
    const { title, content } = param;
    const { user_id } = req.user;

    // 创建日志并保存
    const newLog = this.logRepo.create({
      log_title: title,
      log_content: content,
      createdBy: user_id,
    });
    const savedLog = await this.logRepo.save(newLog);

    return savedLog
      ? resultSuccess({
          log_title: savedLog.log_title,
        })
      : resultError('日志上传失败!');
  }
}
