import mongoose from "mongoose";

interface ITripModel extends mongoose.Document {
  tripId: string;
  name: string;
  description: string;
  status: string;
  image: string;
  location: string;
  timestamp: Date;
  organizerId: string;
  categoryId: string;
}
export { ITripModel };
