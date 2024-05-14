import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/users.entity';
import { Repository } from 'typeorm';
import { encryptPwd, resultError, resultSuccess } from '@/utils';
import {
  createAccountDto,
  editAccountDto,
  GetListDto,
  DeleteAccountDto,
} from './dto/account-crud.dto';
import { hashSync } from 'bcryptjs';
import { Role } from '@/entities/roles.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}

  async getAccountList(params: GetListDto) {
    const { page, pageSize } = params;
    const skip = (page - 1) * pageSize;

    const [list, total] = await this.userRepo.findAndCount({
      relations: ['role'],
      skip,
      take: pageSize,
      where: {
        is_deleted: 0,
      },
    });
    const usersList = list.map((user) => ({
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      role_name: user.role ? user.role.role_name : null,
      userId: user.user_id,
    }));

    return resultSuccess({ items: usersList, total });
  }

  async createAccount(params: createAccountDto) {
    const { username, password, email, role_name } = params;

    // 对password进行加密
    const saltRounds = 10;
    const hashedPwd = hashSync(password, saltRounds);

    const role = await this.roleRepo.findOne({
      where: {
        role_name,
      },
    });
    // 创建用户并保存
    const newAccount = this.userRepo.create({
      username,
      password: hashedPwd,
      role,
      email,
    });
    const savedAccount = await this.userRepo.save(newAccount);

    return resultSuccess({
      userId: savedAccount.user_id,
    });
  }

  async editAccount(params: editAccountDto) {
    const { username, password, email, role_name, userId } = params;

    try {
      const hashedPwd = encryptPwd(password);
      const role = await this.roleRepo.findOne({
        where: {
          role_name,
        },
      });
      const { affected } = await this.userRepo.update(
        {
          user_id: userId,
        },
        {
          username,
          email,
          password: hashedPwd,
          role,
        },
      );

      if (affected === 1) {
        return resultSuccess({ userId }, { message: '用户信息更新成功!' });
      }
      return resultError('该用户信息更新失败!');
    } catch (error) {
      return resultError(error);
    }
  }

  async deleteAccount(params: DeleteAccountDto) {
    const { userId } = params;

    try {
      const { affected } = await this.userRepo.update(
        { user_id: userId },
        { is_deleted: 1 },
      );
      if (affected === 1) {
        return resultSuccess({ userId, isDelete: true });
      } else {
        return resultError('删除失败!');
      }
    } catch (error) {
      return resultError(error);
    }
  }
}
