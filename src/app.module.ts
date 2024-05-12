import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

//  配置数据库连接
import { TypeOrmModule } from '@nestjs/typeorm';

// 模块
import { PermissionsModule } from './modules/permissions/permissions.module';
import { AccountModule } from './account/account.module';
import { AccountModule } from './modules/account/account.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
