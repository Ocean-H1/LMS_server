import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Role } from './roles.entity'; // 引入Role实体
import { Log } from './logs.entity';
import { Reservation } from './reservations.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false }) // 不在选择查询中返回密码字段，出于安全考虑
  password: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // 添加 is_deleted 字段的对应属性
  @Column({
    type: 'tinyint', // 对应数据库中的 TINYINT 类型
    width: 1, // TINYINT 的宽度（可选，通常 TINYINT 不需要这个）
    default: () => 0, // 设置默认值为 0
    comment: '是否删除,0:未删除,1:已删除（软删除）',
  })
  is_deleted: number;

  @OneToMany(() => Log, (log) => log.createdBy)
  logs: Log[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
