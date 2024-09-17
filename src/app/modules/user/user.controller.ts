import jwt, { JwtPayload }  from 'jsonwebtoken';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import sendResponseWithToken from '../../utils/sendResponseWithToken';
import AppError from '../../erros/AppError';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createUserIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await UserServices.loginUser(userData);
  const { accessToken } = result;
  sendResponseWithToken(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully',
    token: accessToken,
    data: result.user,
  });
});

const getUser = catchAsync(async (req, res) => {
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
  const result = await UserServices.getUserFromDB(userId);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
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
  const result = await UserServices.updateProfileIntoDB(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});
export const UserControllers = {
  createUser,
  loginUser,
  getUser,
  updateProfile,
};
