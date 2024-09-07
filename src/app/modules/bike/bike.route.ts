import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BikeInfoValidation } from './bike.validation';
import { BikeInfoControllers } from './bike.controller';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.admin),
    validateRequest(BikeInfoValidation.bikeInfoValidationSchema),
    BikeInfoControllers.createBike
    
);

export const BikeRoutes = router;