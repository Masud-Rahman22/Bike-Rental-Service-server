import mongoose from 'mongoose';
import { TBikeInfo } from './bike.interface';

const bikeSchema = new mongoose.Schema<TBikeInfo>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  cc: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    required: true,
    unique: true
  },
  brand: {
    type: String,
    required: true,
  },
});

export const BikeInfo = mongoose.model('BikeInfo', bikeSchema);
