import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get(
    '/me/:_id',
    UserControllers.getUser,
);

export const UserRoutes = router;