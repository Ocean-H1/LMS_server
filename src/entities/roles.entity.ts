import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './users.entity'; // 引入User实体

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column()
  role_name: string;

  @Column('json')
  permissions: any; // 使用JSON字段存储权限详情

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
