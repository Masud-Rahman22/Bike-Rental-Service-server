import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get(
    '/me/:_id',
    UserControllers.getUser,
);

router.put(
    '/me/:_id',
    UserControllers.updateProfile,
)
export const UserRoutes = router;