import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateLogDto } from './dto/create-log.dto';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
  constructor(private readonly LogService: LogService) {}

  // 日志上传
  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  async upload(@Body() param: CreateLogDto, @Req() req) {
    return this.LogService.upload(param, req);
  }
}
