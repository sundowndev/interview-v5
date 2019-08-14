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

    if (req.query.date) {
      Object.assign(query.where, {});
    }

    if (req.query.cap) {
      Object.assign(query.where, {
        capacity: { $gte: parseInt(req.query.cap, 10) },
      });
    }

    if (req.query.eq) {
      const allStmt = [];

      for (const equipement of req.query.eq.split(',')) {
        allStmt.push({ $elemMatch: { uuid: equipement } });
      }

      Object.assign(query.where, {
        equipements: {
          $all: allStmt,
        },
      });
    }

    console.log(query.where);

    query.order = {
      createdAt: 'DESC',
      capacity: 'DESC',
    };
    query.skip = req.app.locals.offset ? req.app.locals.offset : 0;
    query.take = req.app.locals.limit ? req.app.locals.limit : undefined;

    const documents = await getMongoRepository(Room).find(query);

    req.app.locals.results = documents.length;
    req.app.locals.return = documents;

    return next();
  } catch (e) {
    return next(msg.errorApi(e));
  }
};
