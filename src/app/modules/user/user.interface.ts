/* eslint-disable no-unused-vars */

import { Model } from "mongoose";

export type TUser = {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: 'admin' | 'user'
};

export type TLoginInfo = {
    email: string;
    password: string;
}

export interface UserModel extends Model<TUser> {
    isUserExistByEmail(email: string): Promise<TUser | null>;
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}