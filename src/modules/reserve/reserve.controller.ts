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
import {
  CreateReservationDto,
  GetReservationByIdDto,
  JudgeReserveDto,
} from './dto/reservation.dto';
import { ReserveService } from './reserve.service';

@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  // 预约
  @Post('createReservation')
  @UseGuards(AuthGuard('jwt'))
  async createReservation(@Body() params: CreateReservationDto) {
    return await this.reserveService.createReservation(params);
  }

  // 根据lab_id查询指定实验室可预约时段
  @Post('judgeReserve')
  @UseGuards(AuthGuard('jwt'))
  async ifCanReserve(@Body() params: JudgeReserveDto) {
    return await this.reserveService.judgeReserve(params);
  }

  // 根据user_id查询拥有的预约
  @Get('getReservationListById')
  @UseGuards(AuthGuard('jwt'))
  async getReservationListById(@Query() params: GetReservationByIdDto) {
    return await this.reserveService.getReservationListById(params);
  }
}
