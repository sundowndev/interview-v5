import { IsDate } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
} from 'typeorm';
import { Room } from './Room';

@Entity()
export class Booking {
  @ObjectIdColumn()
  public id!: ObjectID;

  @OneToOne(() => Room)
  @JoinColumn()
  public room!: Room;

  @Column()
  @IsDate()
  public startingAt!: Date;

  @Column()
  @IsDate()
  public finishingAt!: Date;

  @Column()
  @IsDate()
  public createdAt: Date;

  @Column()
  @IsDate()
  public updatedAt: Date;

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
