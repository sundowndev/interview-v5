import express, { Router } from 'express';
import * as roomsController from '../controllers/rooms';
import { paginate } from '../utils/pagination';

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
router.route('/').get(paginate(20), roomsController.getRooms);

export default router;
