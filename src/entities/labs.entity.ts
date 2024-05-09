import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Device } from './devices.entity'; // 引入Device实体
import { Reservation } from './reservations.entity';

@Entity('labs')
export class Lab {
  @PrimaryGeneratedColumn()
  lab_id: number;

  @Column()
  lab_name: string;

  @Column()
  location: string;

  @Column()
  capacity: number;

  @OneToMany(() => Device, (device) => device.lab)
  devices: Device[];

  @OneToMany(() => Reservation, (reservation) => reservation.lab)
  reservations: Reservation[];
}
