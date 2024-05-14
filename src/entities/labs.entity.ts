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

  @Column({ type: 'varchar', length: 255, nullable: true }) // 可以设置为nullable: false，如果字段不允许为空
  responsible_person: string;

  @OneToMany(() => Device, (device) => device.lab)
  devices: Device[];

  @OneToMany(() => Reservation, (reservation) => reservation.lab)
  reservations: Reservation[];
}
