import { ObjectId } from 'bson';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: ObjectId;

  @Column()
  public name!: string;

  @Column()
  public description!: string;

  @Column()
  public capacity: number;

  @Column()
  public equipements: any[];

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;

  constructor() {
    super();

    this.capacity = 5;
    this.equipements = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
