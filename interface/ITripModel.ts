import mongoose from "mongoose";

interface ITripModel extends mongoose.Document {
  tripId: string;
  name: string;
  description: string;
  status: string;
  image: string;
  location: string;
  date: Date;
  organizerId: string;
  categoryId: string;
}
export { ITripModel };
