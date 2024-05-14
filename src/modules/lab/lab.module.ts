import { Module } from '@nestjs/common';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lab } from '@/entities/labs.entity';

@Module({
  controllers: [LabController],
  providers: [LabService],
  imports: [TypeOrmModule.forFeature([Lab])],
})
export class LabModule {}
