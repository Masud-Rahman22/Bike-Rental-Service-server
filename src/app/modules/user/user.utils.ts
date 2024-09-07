import jwt from 'jsonwebtoken'
import { Schema } from 'mongoose';
export const createToken = (
    jwtPayload: {
        userId: Schema.Types.ObjectId;
        role: "user" | "admin";
    },
    secret: string,
    expiresIn: string
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn
    })
}