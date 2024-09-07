import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface"; // Import UserModel interface
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: 0 },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        role: { type: String, enum: ['admin', 'user'], required: true },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});

userSchema.statics.isUserExistByEmail = async function (email: string) {
    return await this.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isUserExistByCustomId = async function (id) {
    return await User.findOne({ id }).select('+password')
}

userSchema.statics.isJwtIssuedBeforePasswordChanged = async function (passwordChangedTimeStamp: Date, jwtIssuedTimeStamp: number) {
    const passwordChangedAt = new Date(passwordChangedTimeStamp).getTime() / 1000;
    return passwordChangedAt > jwtIssuedTimeStamp;
}

export const User = model<TUser, UserModel>('User', userSchema);








