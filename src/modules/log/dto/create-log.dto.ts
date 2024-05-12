import { IsNotEmpty } from 'class-validator';

export class CreateLogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
