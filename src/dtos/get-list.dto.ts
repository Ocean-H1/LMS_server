import { IsInt, IsOptional } from 'class-validator';
import { Exclude, Transform } from 'class-transformer';

export class GetListDto {
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
