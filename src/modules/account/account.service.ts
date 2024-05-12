import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAccountListDto } from './dto/getAccountList.dto';
import { User } from '@entities/users.entity';
import { Repository } from 'typeorm';
import { resultSuccess } from '@/utils';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getAccountList(param: GetAccountListDto) {
    const { page, pageSize } = param;
    const skip = (page - 1) * pageSize;

    const [list, total] = await this.userRepo.findAndCount({
      relations: ['role'],
      skip,
      take: pageSize,
    });
    const usersList = list.map((user) => ({
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      role_name: user.role ? user.role.role_name : null,
    }));

    return resultSuccess({ items: usersList, total });
  }
}
