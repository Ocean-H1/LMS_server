import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from './account.service';
import {
  createAccountDto,
  editAccountDto,
  GetAccountListDto,
  DeleteAccountDto,
} from './dto/account-crud.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // 获取账号列表
  @Get('getAccountList')
  @UseGuards(AuthGuard('jwt'))
  async getAccountList(@Query() params: GetAccountListDto) {
    return await this.accountService.getAccountList(params);
  }

  // 创建新账号
  @Post('createAccount')
  @UseGuards(AuthGuard('jwt'))
  async createAccount(@Body() params: createAccountDto) {
    return await this.accountService.createAccount(params);
  }

  // 编辑账号信息
  @Post('editAccount')
  @UseGuards(AuthGuard('jwt'))
  async editAccount(@Body() params: editAccountDto) {
    return await this.accountService.editAccount(params);
  }

  // 删除指定账号(软删除)
  @Post('deleteAccount')
  @UseGuards(AuthGuard('jwt'))
  async deleteAccount(@Body() params: DeleteAccountDto) {
    return await this.accountService.deleteAccount(params);
  }
}
