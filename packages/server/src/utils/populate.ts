import { getMongoManager, MongoEntityManager } from 'typeorm';
import fixtures from '../__tests__/fixtures/rooms.json';
import { Room } from '../entity/Room';

const createRooms = async (manager: MongoEntityManager) => {
  for (const fixture of fixtures.rooms) {
    const room = new Room();

    room.name = fixture.name;
    room.description = fixture.description;
    room.capacity = fixture.capacity;
    room.equipements = fixture.equipements;

    await manager.save(room);
  }
};

export default async () => {
  const manager = getMongoManager();

  await manager.deleteMany(Room, {});

  await createRooms(manager);
};
