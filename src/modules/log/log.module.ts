import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from '@/entities/logs.entity';

@Module({
  controllers: [LogController],
  providers: [LogService],
  imports: [TypeOrmModule.forFeature([Log])],
})
export class LogModule {}
