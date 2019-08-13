import fixtures from '../__tests__/fixtures/rooms.json';
import { Room } from '../entity/Room';

const createRooms = async () => {
  for (const i in fixtures.rooms) {
    const room = new Room();

    room.name = fixtures.rooms[i].name;
    room.description = fixtures.rooms[i].description;
    room.capacity = fixtures.rooms[i].capacity;
    room.equipements = fixtures.rooms[i].equipements;

    await room.save();
  }
};

export default async () => {
  await createRooms();
};
