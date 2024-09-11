import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BookingInfoValidation } from './booking.validation';
import { BookingInfoControllers } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(BookingInfoValidation.bookingInfoValidation),
  BookingInfoControllers.createRental,
);

router.put(
  '/:rentalId/return',
  auth(USER_ROLE.admin),
  validateRequest(BookingInfoValidation.BookingInfoUpdateValidation),
  BookingInfoControllers.updateRental,
);

router.get('/', BookingInfoControllers.getAllRentals);

export const RentalRoutes = router;
