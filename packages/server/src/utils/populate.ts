import { Connection, MongoEntityManager } from 'typeorm';
import fixtures from '../__tests__/fixtures/rooms.json';
import { Booking } from '../entity/Booking.js';
import { Room } from '../entity/Room';

const rooms: Room[] = [];

const createRooms = async (manager: MongoEntityManager, items: Room[]) => {
  for (const fixture of items) {
    const object = new Room();

    object.name = fixture.name;
    object.description = fixture.description;
    object.capacity = fixture.capacity;
    object.equipements = fixture.equipements;

    await manager.save(object);

    rooms.push(object);
  }
};

const createBookings = async (
  manager: MongoEntityManager,
  items: Booking[],
) => {
  for (const fixture of items) {
    const targetRoom = rooms[0];

    const booking = new Booking();
    booking.startingAt = new Date(fixture.startingAt);
    booking.finishingAt = new Date(fixture.finishingAt);

    targetRoom.bookings.push(booking);

    await manager.save(targetRoom);
  }
};

export default async (connection: Connection) => {
  const manager = connection.mongoManager;

  // Drop database
  await connection.dropDatabase();

  // Create rooms from fixture file
  await createRooms(manager, fixtures.rooms as any);
  await createBookings(manager, fixtures.bookings as any);
};
