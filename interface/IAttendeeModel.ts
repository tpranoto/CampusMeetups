import mongoose from "mongoose";

interface IAttendeeModel extends mongoose.Document {
  studentId: String;
  tripId: String;
}
export { IAttendeeModel };
