import { Request, Response } from 'express';
import logger from '../utils/logger';

export default function(error: any, req: Request, res: Response, next: any) {
  if (!res.finished) {
    res.set('Content-Type', 'application/json; charset=utf-8');
    if (error instanceof Error) {
      logger.error(`${req.method} - ${req.url} | ${error.stack}`);
      res.sendStatus(500);
    } else {
      res.status(error.status || 404);
      res.json({
        success: false,
        errorMessage: error.message || 'Unknown Error',
        errors: Array.isArray(error.errors) ? error.errors : undefined,
      });

      logger.warn(`${req.method} - ${req.url} | ${error}`);
    }
  }

  return next();
}
