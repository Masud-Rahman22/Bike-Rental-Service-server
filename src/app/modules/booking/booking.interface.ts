import { Types } from "mongoose";

export type TBookingInfo = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: string;
  returnTime?: string;
  totalCost?: number;
  isReturned: boolean;
};
