import { param, query } from 'express-validator';

export const getRooms = [
  query('cap')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isInt({ min: 1, max: 50 })
    .withMessage('IS_NOT_INT_OF_RANGE_IS_1_TO_50')
    .toInt(),
  query('eq')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .matches(/^([a-z]{1,})(,\s*[a-z]+)*$/)
    .withMessage('ID_MALFORMED'),
  query('startingAt')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isISO8601()
    .toDate()
    .custom(v => new Date(v) >= new Date())
    .withMessage('Select a date in the future, not the past.')
    // .custom((v, { req }) =>
    //   req.query.finishingAt
    //     ? new Date(v) < new Date(req.query.finishingAt)
    //     : true,
    // )
    // .withMessage('Starting date must be before finishing date.'),
    .toDate(),
  query('finishingAt')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isISO8601()
    .custom(v => new Date(v) > new Date())
    .withMessage('Select a date in the future, not the past.')
    // .custom((v, { req }) =>
    //   req.query.startingAt
    //     ? new Date(v) > new Date(req.query.startingAt)
    //     : true,
    // )
    // .withMessage('Finishing date must be after starting date.')
    .toDate(),
];

export const getRoom = [
  param('roomId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('ID_MALFORMED'),
];
