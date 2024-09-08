import { TBikeInfo } from './bike.interface';
import { BikeInfo } from './bike.model';
/* eslint-disable @typescript-eslint/no-explicit-any */

const createBikeIntoDB = async (payload: TBikeInfo) => {
  const result = await BikeInfo.create(payload);
  return result;
};
const getAllBikesFromDB = async () => {
  const result = await BikeInfo.find();
  return result;
};

const updateBikeInfoIntoDB = async (id: string, payload: TBikeInfo) => {
  const result = await BikeInfo.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const DeleteBikeInfoIntoDB = async (id: string) => {
  const bikeInfo = await BikeInfo.findById(id);
  if (!bikeInfo) {
    throw new Error('Bike not found');
  }

  bikeInfo.isAvailable = false;
  const updatedBikeInfo = await bikeInfo.save();

  return updatedBikeInfo;
};
export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeInfoIntoDB,
  DeleteBikeInfoIntoDB,
};
