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

    const bookInfo = {
      roomId: req.params.roomId,
      startingAt: req.body.startingAt,
      finishingAt: req.body.finishingAt,
    };

    // Check if room exists
    const targetRoom = await getMongoRepository(Room).findOne(bookInfo.roomId);

    if (!targetRoom) {
      return next(msg.roomNotFound());
    }

    // TODO: add roomId in conflict check
    // Check if that room hasn't been booked for that date
    const conflictBookings = await getMongoRepository(Booking).find({
      relations: ['room'],
      where: {
        // room: { id: book.roomId.id },
        startingAt: { $gte: new Date(bookInfo.startingAt) },
        finishingAt: { $lte: new Date(bookInfo.finishingAt) },
      },
    });

    if (conflictBookings.length > 0) {
      return next(msg.alreadyBooked());
    }

    const BookEntity = new Booking();
    BookEntity.room = targetRoom.id as any;
    BookEntity.startingAt = new Date(bookInfo.startingAt);
    BookEntity.finishingAt = new Date(bookInfo.finishingAt);

    await manager.save(BookEntity);

    req.app.locals.return = BookEntity;

    return next();
  } catch (e) {
    return next(msg.errorApi(e));
  }
};
