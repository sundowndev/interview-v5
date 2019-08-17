import { body, param } from 'express-validator';

export const postBooking = [
  param('roomId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('ID_MALFORMED'),
  body('startingAt')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isISO8601()
    .toDate(),
  body('finishingAt')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isISO8601()
    .toDate(),
];
