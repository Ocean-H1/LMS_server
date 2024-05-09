import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './users.entity'; // 假设User实体在其他地方定义

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn()
  log_id: number; // 日志ID，自增主键

  @Column({ length: 255 })
  log_title: string; // 日志标题

  @Column('text')
  log_content: string; // 日志内容，使用TEXT类型以存储较长的文本

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn({ name: 'created_by' })
  createdBy: User; // 创建人的ID，对应到用户表的外键

  // 注意：这里我们使用了CreateDateColumn来自动处理创建时间，但数据库字段名是created_at
  // 如果需要匹配数据库中的created_at字段，我们可以不使用CreateDateColumn装饰器，而是直接定义created_at字段
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: false, // 设置为false表示该字段不会在更新时自动更新
  })
  created_at: Date; // 创建时间，默认为当前时间戳
}

// 假设在User实体中定义了与Log的关联
// User.ts 文件中的内容（部分）
// ...
// @Entity('users')
// export class User {
//   ...
//   @OneToMany(() => Log, (log) => log.createdBy)
//   logs: Log[];
//   ...
// }
