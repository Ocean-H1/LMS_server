import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@entities/users.entity';
import { Role } from '@entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { hashSync } from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    private jwt: JwtService,
  ) {}

  // 生成token
  generateToken({ user_id, email }: User) {
    return {
      token: this.jwt.sign({ email, sub: user_id }),
    };
  }

  // 注册
  async register({ username, email, password }: RegisterDto) {
    // 查询该 用户名或邮箱 是否已经注册
    const isExist = await this.userRepo.exists({
      where: [{ username }, { email }],
    });
    if (isExist)
      throw new HttpException('该用户已被注册！', HttpStatus.CONFLICT);

    // 加密
    const saltRounds = 10;
    const hashedPassword = hashSync(password, saltRounds);

    // 默认注册最低权限(普通用户)
    const defaultRole = await this.roleRepo.findOne({
      where: {
        role_name: 'guest',
      },
    });

    // 创建用户并保存;
    const user = this.userRepo.create({
      username,
      email,
      password: hashedPassword,
      role: defaultRole,
    });
    await this.userRepo.save(user);

    // 可以返回一些东西作为成功的标志
    return user.username;
  }

  // 登录
  async login({ username, password }: LoginDto, session) {
    // 查询用户信息
    const user_info = await this.userRepo.findOne({
      where: {
        username,
      },
    });
  }
}
