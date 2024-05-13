import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // 获取角色列表
  @Get('getAllRoleList')
  @UseGuards(AuthGuard('jwt'))
  async getAllRoleList() {
    return await this.roleService.getAllRoleList();
  }
}
