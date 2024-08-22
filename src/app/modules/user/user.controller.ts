import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

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

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully',
        data: result,
    });
});

export const UserControllers = {
    createUser,
    loginUser
};