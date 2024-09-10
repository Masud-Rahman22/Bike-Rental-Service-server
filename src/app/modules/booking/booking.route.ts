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
    validateRequest(BookingInfoValidation.bookingInfoValidationSchema),
    BookingInfoControllers.createRental
)

export const RentalRoutes = router;