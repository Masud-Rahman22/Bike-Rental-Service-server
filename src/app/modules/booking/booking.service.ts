/* eslint-disable @typescript-eslint/no-explicit-any */

import AppError from "../../erros/AppError";
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

const calculateRentalCost = (startTime: string, returnTime: Date, pricePerHour: number): number => {
  // Convert the startTime string to a Date object
  const start = new Date(startTime).getTime();
  const end = returnTime.getTime();

  const durationInMs = end - start;
  const durationInHours = durationInMs / (1000 * 60 * 60); // Convert milliseconds to hours

  return durationInHours * pricePerHour;
};


const updateRentalIntoDB = async (rentalId: string, userId: string) => {
  
  // Find the rental by ID
  const rental = await BookingInfo.findById(rentalId);
  if (!rental) {
    throw new AppError(404,'Rental not found', );
  }

  // Ensure that the user who rented the bike is the one returning it
  if (rental.userId.toString() !== userId) {
    throw new AppError(403,'You are not authorized to return this bike' );
  }

  // Check if the rental is already returned
  if (rental.isReturned) {
    throw new AppError(400,'Bike is already returned');
  }

  // Find the bike by ID
  const bike = await BikeInfo.findById(rental.bikeId);
  if (!bike) {
    throw new AppError(404,'Bike not found');
  }

  // Calculate total cost based on startTime and current time (return time)
  const returnTime = new Date(); // Current time
  const totalCost = calculateRentalCost(rental.startTime, returnTime, bike.pricePerHour);

  // Update rental details
  rental.returnTime = returnTime.toISOString();
  rental.totalCost = totalCost;
  rental.isReturned = true;
  await rental.save();

  // Update bike availability to true (since it's now returned)
  bike.isAvailable = true;
  await bike.save();

  return {
      _id: rental._id,
      userId: rental.userId,
      bikeId: rental.bikeId,
      startTime: rental.startTime,
      returnTime: rental.returnTime,
      totalCost: rental.totalCost,
      isReturned: rental.isReturned,
  };
};

const getAllRentalsFromDB = async()=>{
  const result = await BookingInfo.find();
  if (result.length === 0) {
    return {
      success: false,
      message: 'No Data Found',
      data: []
    };
  }
  return result;
}

export const BookingServices = {
  createRentalIntoDB,
  updateRentalIntoDB,
  getAllRentalsFromDB
};
