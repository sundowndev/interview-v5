'use strict';

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Room } from '../entity/Room';

/**
 * GET /rooms
 * List of rooms.
 */
export const getRooms = async (req: Request, _res: Response, next: any) => {
  let query: any = null;

  if (req.query.search) {
    query = {
      where: {},
      order: {
        name: 'ASC',
        id: 'DESC',
      },
      skip: req.app.locals.offset,
      take: req.app.locals.limit,
    };
  } else {
    query = {
      order: {
        name: 'ASC',
        id: 'DESC',
      },
      skip: req.app.locals.offset,
      take: req.app.locals.limit,
    };
  }

  const documents = await getRepository(Room).find(query);

  req.app.locals.results = documents.length;
  req.app.locals.return = documents;

  return next();
};
