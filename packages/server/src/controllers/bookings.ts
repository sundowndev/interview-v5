import { Request, Response } from 'express';
import { getMongoManager, getMongoRepository } from 'typeorm';
import { Booking } from '../entity/Booking';
import { Room } from '../entity/Room';
import * as msg from '../errors/message_errors';

/**
 * POST /booking/:roomId
 * Book a room.
 */
export const postBooking = async (req: Request, _: Response, next: any) => {
  try {
    const manager = getMongoManager();

    const book = {
      roomId: req.params.roomId,
      startingAt: req.body.startingAt,
      finishingAt: req.body.finishingAt,
    };

    const RoomEntity = await getMongoRepository(Room).findOne(book.roomId);

    // Check if room exists
    if (!RoomEntity) {
      return next(msg.roomNotFound());
    }

    // TODO: add roomId in conflict check
    // Check if that room hasn't been booked for that date
    const conflictBookings = await getMongoRepository(Booking).find({
      relations: ['room'],
      where: {
        // room: { id: book.roomId.id },
        startingAt: { $gte: new Date(book.startingAt) },
        finishingAt: { $lte: new Date(book.finishingAt) },
      },
    });

    if (conflictBookings.length > 0) {
      return next(msg.alreadyBooked());
    }

    const BookEntity = new Booking();
    BookEntity.room = RoomEntity.id as any;
    BookEntity.startingAt = new Date(book.startingAt);
    BookEntity.finishingAt = new Date(book.finishingAt);

    await manager.save(BookEntity);

    req.app.locals.return = BookEntity;

    return next();
  } catch (e) {
    return next(msg.errorApi(e));
  }
};
