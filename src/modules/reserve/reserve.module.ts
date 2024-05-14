import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../../entities/reservations.entity';
import { User } from '@/entities/users.entity';
import { Lab } from '@/entities/labs.entity';

@Module({
  controllers: [ReserveController],
  providers: [ReserveService],
  imports: [TypeOrmModule.forFeature([Reservation, User, Lab])],
})
export class ReserveModule {}
