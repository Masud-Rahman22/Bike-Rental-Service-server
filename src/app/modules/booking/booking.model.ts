import mongoose, { Schema } from 'mongoose';
import { TBookingInfo } from './booking.interface';

const bookingSchema = new mongoose.Schema<TBookingInfo>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      ref: 'BikeInfo',
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    returnTime: {
      type: String,
    },
    totalCost: {
      type: Number,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const BookingInfo = mongoose.model('Booking', bookingSchema);
