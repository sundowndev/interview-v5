import { Request, Response } from 'express';
import { getMongoRepository } from 'typeorm';
import { Room } from '../entity/Room';
import * as msg from '../errors/message_errors';

/**
 * GET /rooms
 * List of rooms.
 */
export const getRooms = async (req: Request, _: Response, next: any) => {
  try {
    const query: any = { where: {}, order: {} };

    // Capacity parameter
    if (req.query.cap) {
      Object.assign(query.where, {
        capacity: { $gte: parseInt(req.query.cap, 10) },
      });
    }

    // Equipement parameter
    if (req.query.eq) {
      const allStmt = [];

      for (const equipement of req.query.eq.split(',')) {
        allStmt.push({ $elemMatch: { uid: equipement } });
      }

      Object.assign(query.where, {
        equipements: {
          $all: allStmt,
        },
      });
    }

    query.order = {
      createdAt: 'DESC',
      capacity: 'DESC',
    };
    query.skip = req.app.locals.offset ? req.app.locals.offset : 0;
    query.take = req.app.locals.limit ? req.app.locals.limit : undefined;

    const documents = await getMongoRepository(Room).find(query);

    // TODO: get bookings of rooms
    // const documents = await getMongoRepository(Room).aggregate([
    //   {
    //     $lookup: {
    //       from: 'room',
    //       localField: 'id',
    //       foreignField: 'room',
    //       as: 'booking',
    //     },
    //   },
    // ]);

    req.app.locals.results = documents.length;
    req.app.locals.return = documents;

    return next();
  } catch (e) {
    return next(msg.errorApi(e));
  }
};
