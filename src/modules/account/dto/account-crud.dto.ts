import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Exclude, Transform } from 'class-transformer';

export type TRoleName = 'admin' | 'guest' | 'user';

export class createAccountDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  role_name: TRoleName;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class editAccountDto extends createAccountDto {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  userId: number;
}

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

export class DeleteAccountDto {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  userId: number;
}
