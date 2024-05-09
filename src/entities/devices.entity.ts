import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Lab } from './labs.entity'; // 引入Lab实体

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  device_id: number;

  @Column()
  device_name: string;

  @ManyToOne(() => Lab, (lab) => lab.devices)
  @JoinColumn({ name: 'lab_id' })
  lab: Lab;

  @Column({ type: 'enum', enum: ['idle', 'in_use', 'under_maintenance'] })
  status: string;
}
