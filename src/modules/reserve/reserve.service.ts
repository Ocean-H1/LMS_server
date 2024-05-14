import { Lab } from '@/entities/labs.entity';
import { Reservation } from '@/entities/reservations.entity';
import { User } from '@/entities/users.entity';
import { resultError, resultSuccess } from '@/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateReservationDto,
  JudgeReserveDto,
  GetReservationByIdDto,
} from './dto/reservation.dto';

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
    @InjectRepository(Lab) private readonly labRepo: Repository<Lab>,
  ) {}

  async createReservation(params: CreateReservationDto) {
    const { user_id, lab_id, date_time, period_time } = params;

    const user = await this.userRepo.findOne({
      where: {
        user_id,
      },
    });
    const lab = await this.labRepo.findOne({
      where: {
        lab_id,
      },
    });
    const newReservation = this.reservationRepo.create({
      user,
      lab,
      date_time,
      period_time,
    });
    try {
      const savedReservation = await this.reservationRepo.save(newReservation);

      return resultSuccess({
        reservation_id: savedReservation.reservation_id,
      });
    } catch (error) {
      return resultError('预约失败!');
    }
  }

  // 判断是否可以预约
  async judgeReserve(params: JudgeReserveDto) {
    const { lab_id, date_time, period_time, user_num } = params;

    const lab = await this.labRepo.findOne({
      where: {
        lab_id,
      },
    });

    if (user_num > lab.capacity) {
      return resultSuccess({
        isAvailable: false,
        reason: `人数超过该实验室容纳数量(${lab.capacity})，请选择其他实验室或分开进行试验!`,
      });
    }

    const reservationList = await this.reservationRepo.find({
      where: {
        lab,
        date_time,
        status: 'succeeded',
      },
    });
    const unAvailableTime = reservationList.map(
      (reservation) => reservation.period_time,
    );

    if (unAvailableTime.includes(period_time)) {
      return resultSuccess({
        isAvailable: false,
        reason: `该时间段已被占用,请重新选择实验室或时间段!`,
      });
    }

    return resultSuccess({
      isAvailable: true,
    });
  }

  async getReservationListById(params: GetReservationByIdDto) {
    const { page, pageSize, user_id } = params;
    const skip = (page - 1) * pageSize;
    const user = await this.userRepo.findOne({
      where: {
        user_id,
      },
    });
    const [list, total] = await this.reservationRepo.findAndCount({
      where: {
        user,
      },
      skip,
      take: pageSize,
      relations: ['lab'],
    });
    const reservationList = list.map((reservation) => {
      return {
        ...reservation,
        lab_name: reservation.lab.lab_name,
        location: reservation.lab.location,
      };
    });
    return resultSuccess({
      items: reservationList,
      total,
    });
  }
}
