import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../erros/AppError';
import config from '../../config';
import { DecodedToken } from '../../interface/DecodedToken';
import { BookingServices } from './booking.service';
import sendResponse from '../../utils/sendResponse';

const createRental = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized to access this')
        }
        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
      const userId = (decoded as DecodedToken)?.id;
      console.log(userId)
      const { bikeId, startTime } = req.body;
      const rental = await BookingServices.createRentalIntoDB(userId, bikeId, startTime);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental created successfully',
        data: rental,
    })
})

export const BookingInfoControllers = {
    createRental,
}