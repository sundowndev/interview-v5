import express, { Router } from 'express';
import * as bookingsController from '../controllers/bookings';

const router: Router = express.Router();

/**
 * @api {get} /bookings/:roomId Book a room
 * @apiName GetRooms
 * @apiGroup Rooms
 *
 * @apiParam {Number} roomId Id of the room to book
 *
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {Array} item  Booked room.
 */
router.route('/:roomId').post(bookingsController.postBooking);

export default router;
