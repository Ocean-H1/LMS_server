import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { GetAccountListDto } from './dto/getAccountList.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // 获取账号列表
  @Get('getAccountList')
  async getAccountList(@Query() param: GetAccountListDto) {
    return await this.accountService.getAccountList(param);
  }
}
