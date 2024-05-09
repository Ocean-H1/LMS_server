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

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column({ type: 'enum', enum: ['pending', 'approved', 'rejected'] })
  status: string;
}
