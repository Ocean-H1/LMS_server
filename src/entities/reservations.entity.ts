import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity'; // 引入User实体
import { Lab } from './labs.entity'; // 引入Lab实体

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  reservation_id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Lab, (lab) => lab.reservations)
  @JoinColumn({ name: 'lab_id' })
  lab: Lab;

  @Column({ type: 'varchar', length: 255 }) // 指定varchar类型和长度
  date_time: string;

  // 使用定义的枚举类型
  @Column({
    type: 'enum',
    enum: [1, 2, 3, 4, 5],
    default: 1, // 你可以设置一个默认值，如果不设置则插入时必须指定值
  })
  period_time: number;

  @Column({
    type: 'enum',
    enum: ['succeeded', 'cancelled'],
    default: 'succeeded',
  })
  status: string;
}
