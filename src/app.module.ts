import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

//  配置数据库连接
import { TypeOrmModule } from '@nestjs/typeorm';

// 模块
import { PermissionsModule } from './modules/permissions/permissions.module';
import { AccountModule } from './modules/account/account.module';
import { LogModule } from './modules/log/log.module';
import { RoleModule } from './modules/role/role.module';
import { LabModule } from './modules/lab/lab.module';
import { ReserveModule } from './modules/reserve/reserve.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 配置数据库连接
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'lab_manage_system',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    PermissionsModule,
    AccountModule,
    LogModule,
    RoleModule,
    LabModule,
    ReserveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
