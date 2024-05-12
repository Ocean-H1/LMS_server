import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@entities/users.entity';
import { Role } from '@entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { hashSync, compareSync } from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    private jwt: JwtService,
  ) {}

  // 生成token
  generateToken({ user_id, email }: Partial<User>) {
    return this.jwt.sign({ email, sub: user_id });
  }

  // 注册
  async register({ username, email, password }: RegisterDto) {
    // 查询该 用户名或邮箱 是否已经注册
    const isExist = await this.userRepo.exists({
      where: [{ username }, { email }],
    });
    if (isExist) {
      throw new HttpException('该用户已被注册！', HttpStatus.CONFLICT);
    }

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
  async login({ usernameOrEmail, attemptedPassword }: LoginDto) {
    // 查询用户信息
    const user_info = await this.userRepo.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      select: ['password', 'user_id', 'email', 'username'],
      relations: ['role'],
    });

    if (!user_info) {
      throw new HttpException('该用户不存在，请检查用户名或邮箱后重试！', 200);
    }
    // 验证密码是否正确
    const isPasswordValid = compareSync(attemptedPassword, user_info?.password);

    if (isPasswordValid) {
      // 登录成功
      const token = this.generateToken({
        user_id: user_info.user_id,
        email: user_info.email,
      });

      return {
        token,
      };
    } else {
      throw new HttpException('用户名或密码错误，请检查后重试！', 200);
    }
  }

  // 用户信息
  async getUserInfo(req) {
    const { user } = req;
    return {
      user_id: user.user_id,
      username: user.username,
      // 头像暂时写死
      avatar: '',
      permissions: user.role.permissions,
      email: user.email,
    };
  }
}
