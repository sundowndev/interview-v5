import { validationResult } from 'express-validator';
import * as msg from '../errors/message_errors';

export default (req: Request, {}, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(msg.validationError(errors.array()));
  }

  return next();
};
