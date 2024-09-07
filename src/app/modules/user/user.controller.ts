import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import sendResponseWithToken from '../../utils/sendResponseWithToken';
import AppError from '../../erros/AppError';

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
    const { _id } = req.params;
    const result = await UserServices.getUserFromDB(_id);

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
    const { _id } = req.params;

    const result = await UserServices.updateProfileIntoDB(
        _id,
        req.body,
    );
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
    updateProfile
};