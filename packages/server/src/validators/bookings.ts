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
    .custom(v => new Date(v) > new Date())
    .withMessage('Select a date in the future, not the past.')
    .custom((v, { req }) =>
      req.body ? new Date(v) < new Date(req.body.finishingAt) : true,
    )
    .withMessage('Starting date must be before starting date.')
    .toDate(),
  body('finishingAt')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isISO8601()
    .custom(v => new Date(v) > new Date())
    .withMessage('Select a date in the future, not the past.')
    .custom((v, { req }) =>
      req.body ? new Date(v) > new Date(req.body.startingAt) : true,
    )
    .withMessage('Finishing date must be after starting date.')
    .toDate(),
];
