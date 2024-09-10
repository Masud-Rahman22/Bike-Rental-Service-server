import { Router } from 'express';
import { AuthRoutes } from '../modules/user/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { BikeRoutes } from '../modules/bike/bike.route';
import { RentalRoutes } from '../modules/booking/booking.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/bikes',
        route: BikeRoutes
    },
    {
        path: '/rentals',
        route: RentalRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;