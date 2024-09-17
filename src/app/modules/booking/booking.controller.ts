import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../erros/AppError';
import config from '../../config';
import { BookingServices } from './booking.service';
import sendResponse from '../../utils/sendResponse';

const createRental = catchAsync(async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader!.split(' ')[1];
  if (!token) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'you are not authorized to access this',
    );
  }
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const userId = decoded?.userId;
  console.log(userId);
  const { bikeId, startTime } = req.body;
  const rental = await BookingServices.createRentalIntoDB(
    userId,
    bikeId,
    startTime,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: rental,
  });
});

const updateRental = catchAsync(async (req, res) => {
  const { rentalId } = req.params;

  const authHeader = req.headers.authorization;
  const token = authHeader!.split(' ')[1];
  if (!token) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'you are not authorized to access this',
    );
  }
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const userId = decoded?.userId;
  const result = await BookingServices.updateRentalIntoDB(rentalId, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike returned successfully',
    data: result,
  });
});

const getAllRentals = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllRentalsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

export const BookingInfoControllers = {
  createRental,
  updateRental,
  getAllRentals,
};
