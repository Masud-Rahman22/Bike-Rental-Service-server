import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';

export const createToken = (
  jwtPayload: {
    userId: Schema.Types.ObjectId;
    role: 'user' | 'admin';
  },
  secret: string,
  expiresIn: string,
) => {
  const token = jwt.sign(
    { userId: jwtPayload.userId.toString(), role: jwtPayload.role },
    secret,
    { expiresIn }
  );

  return token;
};
