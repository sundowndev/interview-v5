import { IsDate } from 'class-validator';
import { Column } from 'typeorm';

export class Booking {
  @Column()
  @IsDate()
  public startingAt!: Date;

  @Column()
  @IsDate()
  public finishingAt!: Date;

}
