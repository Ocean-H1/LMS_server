import { Exclude, Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetAccountListDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page: number = 1;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  pageSize: number = 10;

  @Exclude()
  _t: string;
}
