'use strict';

import { Request, Response } from 'express';

/**
 * GET /rooms
 * List of rooms.
 */
export const getRooms = (_req: Request, res: Response) => {
  res.sendStatus(200);
};

export const getOneRoom = (_req: Request, res: Response) => {
  res.sendStatus(200);
};
