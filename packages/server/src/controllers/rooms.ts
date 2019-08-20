import { Request, Response } from 'express';
import { getMongoRepository } from 'typeorm';
import { Room } from '../entity/Room';
import * as msg from '../response/message_errors';

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

    if (req.query.startingAt || req.query.finishingAt) {
      Object.assign(query.where, {
        $nor: [
          {
            bookings: {
              $elemMatch: {
                startingAt: {
                  $lte: req.query.startingAt
                    ? new Date(req.query.startingAt)
                    : new Date(),
                },
                finishingAt: {
                  $gte: req.query.startingAt
                    ? new Date(req.query.startingAt)
                    : new Date(),
                },
              },
            },
          },
          {
            bookings: {
              $elemMatch: {
                startingAt: {
                  $lte: req.query.finishingAt
                    ? new Date(req.query.finishingAt)
                    : new Date(),
                },
                finishingAt: {
                  $gte: req.query.finishingAt
                    ? new Date(req.query.finishingAt)
                    : new Date(),
                },
              },
            },
          },
          {
            bookings: {
              $elemMatch: {
                startingAt: {
                  $gte: req.query.startingAt
                    ? new Date(req.query.startingAt)
                    : new Date(),
                },
                finishingAt: {
                  $lte: req.query.finishingAt
                    ? new Date(req.query.finishingAt)
                    : new Date(),
                },
              },
            },
          },
        ],
      });
    }

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

/**
 * GET /rooms/:roomId
 * List of rooms.
 */
export const getOneRoom = async (req: Request, _: Response, next: any) => {
  try {
    const document = await getMongoRepository(Room).findOne(req.params.roomId);

    if (!document) {
      return next(msg.roomNotFound());
    }

    req.app.locals.return = document;

    return next();
  } catch (e) {
    return next(msg.errorApi(e));
  }
};
