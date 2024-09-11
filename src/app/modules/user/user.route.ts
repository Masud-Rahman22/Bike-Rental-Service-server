import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validate';

const router = express.Router();

router.get('/me/:_id', UserControllers.getUser);

router.put(
  '/me/:_id',
  validateRequest(UserValidation.userUpdateValidationSchema),
  UserControllers.updateProfile,
);
export const UserRoutes = router;
