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
