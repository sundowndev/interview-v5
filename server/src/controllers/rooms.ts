import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Room } from '../entity/Room';

/**
 * GET /rooms
 * List of rooms.
 */
export const getRooms = async (req: Request, _res: Response, next: any) => {
  const query: any = {};

  if (req.query.date) {
    Object.assign(query.where, {});
  }

  if (req.query.cap) {
    query.where = {
      capacity: 5,
    };
  }

  if (req.query.eq) {
    Object.assign(query.where, {});
  }

  query.order = {
    name: 'ASC',
    id: 'DESC',
  };
  query.skip = req.app.locals.offset ? req.app.locals.offset : undefined;
  query.take = req.app.locals.limit ? req.app.locals.limit : undefined;

  const documents = await getRepository(Room).find(query);

  req.app.locals.results = documents.length;
  req.app.locals.return = documents;

  return next();
};
