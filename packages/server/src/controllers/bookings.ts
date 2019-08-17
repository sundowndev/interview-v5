import { Request, Response } from 'express';
import { getMongoManager, getMongoRepository } from 'typeorm';
import { Booking } from '../entity/Booking';
import { Room } from '../entity/Room';
import * as msg from '../response/message_errors';

/**
 * POST /bookings/:roomId
 * Book a room.
 */
export const postBooking = async (req: Request, _: Response, next: any) => {
  try {
    const manager = getMongoManager();

    // Gather request data
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

    // Check if any booking exists for that room at the same dates
    const conflictBookings = await getMongoRepository(Room).findOne(
      targetRoom.id,
      {
        select: ['id', 'bookings'],
        where: {
          $or: [
            {
              bookings: {
                $elemMatch: {
                  startingAt: { $lte: new Date(bookInfo.startingAt) },
                  finishingAt: { $gte: new Date(bookInfo.startingAt) },
                },
              },
            },
            {
              bookings: {
                $elemMatch: {
                  startingAt: { $lte: new Date(bookInfo.finishingAt) },
                  finishingAt: { $gte: new Date(bookInfo.finishingAt) },
                },
              },
            },
            {
              bookings: {
                $elemMatch: {
                  startingAt: { $gte: new Date(bookInfo.startingAt) },
                  finishingAt: { $lte: new Date(bookInfo.finishingAt) },
                },
              },
            },
          ],
        },
        cache: true,
      },
    );

    if (conflictBookings) {
      return next(msg.alreadyBooked());
    }

    const BookEntity = new Booking();
    BookEntity.startingAt = new Date(bookInfo.startingAt);
    BookEntity.finishingAt = new Date(bookInfo.finishingAt);

    targetRoom.bookings.push(BookEntity);

    await manager.save(targetRoom);

    req.app.locals.return = BookEntity;

    return next();
  } catch (e) {
    return next(msg.errorApi(e));
  }
};
