import { GetListDto } from '@/dtos/get-list.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LabService } from './lab.service';

@Controller('lab')
export class LabController {
  constructor(private readonly labService: LabService) {}

  @Get('getLabList')
  @UseGuards(AuthGuard('jwt'))
  async getLabList(@Query() params: GetListDto) {
    return await this.labService.getLabList(params);
  }
}
