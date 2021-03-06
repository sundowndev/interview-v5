import { IsDate, IsInt, Length, Max, Min } from 'class-validator';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Booking } from './Booking';

@Entity()
export class Room {
  @ObjectIdColumn()
  public id!: ObjectID;

  @Column()
  @Length(4, 50)
  public name!: string;

  @Column()
  @Length(4, 240)
  public description!: string;

  @Column()
  @IsInt()
  @Min(0)
  @Max(100)
  public capacity!: number;

  @Column()
  public equipements: Array<{ uid: string; name: string }>;

  @Column(() => Booking)
  public bookings!: Booking[];

  @Column()
  @IsDate()
  public createdAt: Date;

  @Column()
  @IsDate()
  public updatedAt: Date;

  constructor() {
    this.bookings = [];
    this.equipements = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
