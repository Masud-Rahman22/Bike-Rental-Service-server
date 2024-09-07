import { TBikeInfo } from './bike.interface';
import { BikeInfo } from './bike.model';
/* eslint-disable @typescript-eslint/no-explicit-any */

const createBikeIntoDB = async (payload: TBikeInfo) => {
    const result = await BikeInfo.create(payload);
    return result;
};

export const BikeServices = {
    createBikeIntoDB
};