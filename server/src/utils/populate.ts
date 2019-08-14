import fixtures from '../__tests__/fixtures/rooms.json';
import { Room } from '../entity/Room';

const createRooms = async () => {
  for (const fixture of fixtures.rooms) {
    const room = new Room();

    room.name = fixture.name;
    room.description = fixture.description;
    room.capacity = fixture.capacity;
    room.equipements = fixture.equipements;

    await room.save();
  }
};

export default async () => {
  await createRooms();
};
