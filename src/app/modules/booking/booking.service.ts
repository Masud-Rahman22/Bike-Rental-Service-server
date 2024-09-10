/* eslint-disable @typescript-eslint/no-explicit-any */

import { BikeInfo } from "../bike/bike.model";
import { BookingInfo } from "./booking.model";

const createRentalIntoDB = async (userId: string, bikeId: string, startTime: Date) => {
    const bike = await BikeInfo.findById(bikeId);
    if (!bike) {
      throw new Error('Bike not found');
    }

    if (!bike.isAvailable) {
      throw new Error('Bike is not available');
    }

    // Create a new rental
    const newRental = new BookingInfo({
      userId,
      bikeId,
      startTime,
      returnTime: null,
      totalCost: 0,
      isReturned: false,
    });

    const savedRental = await newRental.save();

    // Update the bike's availability to false
    bike.isAvailable = false;
    await bike.save();

    return savedRental;
};

export const BookingServices = {
  createRentalIntoDB,
};
