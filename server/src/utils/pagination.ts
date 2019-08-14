import { Request, Response } from 'express';

export const paginate = (limit: number) => {
  return function(req: Request, _res: Response, next: any) {
    req.app.locals.limit = limit || 20;
    req.app.locals.page = parseInt(req.query.page, 10) || 1;
    req.app.locals.offset = (req.app.locals.page - 1) * req.app.locals.limit;

    req.app.locals.opts_return = {
      limit: req.app.locals.limit,
      page: req.app.locals.page,
      offset: req.app.locals.offset,
    };

    return next();
  };
};
