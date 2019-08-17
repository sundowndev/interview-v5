import { query } from 'express-validator';

export const paginate = [
  query('page')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isInt({ min: 1, max: 99999 })
    .withMessage('IS_NOT_INT_OF_RANGE_IS_1_TO_99999')
    .toInt(),
];
