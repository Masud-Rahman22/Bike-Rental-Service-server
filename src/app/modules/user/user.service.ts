/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../erros/AppError';
import { TLoginInfo, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
};

const loginUser = async (payload: TLoginInfo) => {
    const user = (await User.isUserExistByEmail(payload?.email))
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'this user is not found!')
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password does not match!')
    }
    return user;
}

export const UserServices = {
    createUserIntoDB,
    loginUser
};