import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validate';

const router = express.Router();

router.post(
    '/signup',
    validateRequest(UserValidation.userValidationSchema),
    UserControllers.createUser,
);

router.post(
    '/login',
    validateRequest(UserValidation.LoginValidationSchema),
    UserControllers.loginUser,
);

export const AuthRoutes = router;