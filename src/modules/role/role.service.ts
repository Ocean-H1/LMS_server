import { Role } from '@/entities/roles.entity';
import { resultSuccess } from '@/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}

  async getAllRoleList() {
    const roleList = await this.roleRepo.find();

    const list = roleList.map((role) => {
      return {
        roleName: role.role_name,
        roleValue: role.role_name,
        ...role,
      };
    });
    return resultSuccess(list);
  }
}
