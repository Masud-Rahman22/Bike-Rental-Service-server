import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';

const createBike = catchAsync(async (req, res) => {
  const bikeInfo = req.body;
  const result = await BikeServices.createBikeIntoDB(bikeInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike added successfully',
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

const updateBikeInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.updateBikeInfoIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike updated successfully',
    data: result,
  });
});

const deleteBikeInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.DeleteBikeInfoIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike deleted successfully',
    data: result,
  });
});

export const BikeInfoControllers = {
  createBike,
  getAllBikes,
  updateBikeInfo,
  deleteBikeInfo,
};
