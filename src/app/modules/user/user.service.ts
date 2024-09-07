/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../erros/AppError';
import { TLoginInfo, TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from './user.utils';
import config from '../../config';

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

    const jwtPayload = {
        userId: user?._id,
        role: user?.role
    }

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string)

    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string)

    return {
        accessToken,
        refreshToken,
        user
    };
}

const getUserFromDB = async (id: string) => {
    const result = await User.findById(id);
    return result;
};

const updateProfileIntoDB = async(id: string , payload:TLoginInfo)=>{
    const result = await User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
}

export const UserServices = {
    createUserIntoDB,
    loginUser,
    getUserFromDB,
    updateProfileIntoDB
};