import { Controller, Get, Post, Body } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // 登录
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.permissionsService.login(loginDto);
  }

  // 注册
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.permissionsService.register(registerDto);
  }
}
