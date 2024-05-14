import { GetListDto } from '@/dtos/get-list.dto';
import { Lab } from '@/entities/labs.entity';
import { resultSuccess } from '@/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LabService {
  constructor(
    @InjectRepository(Lab) private readonly labRepo: Repository<Lab>,
  ) {}

  async getLabList(params: GetListDto) {
    const { page, pageSize } = params;
    const skip = (page - 1) * pageSize;

    const [list, total] = await this.labRepo.findAndCount({
      skip,
      take: pageSize,
      relations: ['devices'],
    });

    return resultSuccess({
      items: list,
      total,
    });
  }
}
