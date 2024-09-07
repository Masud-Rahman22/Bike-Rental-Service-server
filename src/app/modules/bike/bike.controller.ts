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
})

export const BikeInfoControllers = {
    createBike,
};