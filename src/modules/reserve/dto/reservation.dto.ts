import { GetListDto } from '@/dtos/get-list.dto';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ReservationDto {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  lab_id: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: '日期必须是 YYYY-MM-DD 格式',
  })
  date_time: string;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  period_time: number;
}

export class CreateReservationDto extends ReservationDto {
  @IsNotEmpty()
  user_id: number;
}

export class JudgeReserveDto extends ReservationDto {
  // 占用人数
  @IsNotEmpty()
  user_num: number;
}

export class GetReservationByIdDto extends GetListDto {
  @IsNotEmpty()
  user_id: number;
}
