import express, { Router } from 'express';
import * as roomsController from '../controllers/rooms';
import validationMiddleware from '../middlewares/validation';
import { paginate } from '../utils/pagination';
import { paginate as paginateValidator } from '../validators/pagination';
import * as validators from '../validators/rooms';

const router: Router = express.Router();

/**
 * @api {get} /rooms Fetch all rooms
 * @apiName GetRooms
 * @apiGroup Rooms
 *
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {Integer} limit  Lastname of the User.
 * @apiSuccess {Integer} page  Current page.
 * @apiSuccess {Integer} offset  Offset of the request.
 * @apiSuccess {Integer} results  Number of results.
 * @apiSuccess {Array} items  Rooms.
 */
router
  .route('/')
  .get(
    validators.getRooms,
    paginateValidator,
    validationMiddleware,
    paginate(20),
    roomsController.getRooms,
  );

/**
 * @api {get} /rooms/:roomId Fetch one room
 * @apiName GetRooms
 * @apiGroup Rooms
 *
 * @apiParam {Number} roomId Id of the room to book
 *
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {Integer} limit  Lastname of the User.
 * @apiSuccess {Integer} page  Current page.
 * @apiSuccess {Integer} offset  Offset of the request.
 * @apiSuccess {Integer} results  Number of results.
 * @apiSuccess {Array} items  Rooms.
 */
router
  .route('/:roomId')
  .get(validators.getRoom, validationMiddleware, roomsController.getOneRoom);

export default router;
