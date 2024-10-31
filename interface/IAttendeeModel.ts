import mongoose from "mongoose";

interface IAttendeeModel extends mongoose.Document {
  studentId: String;
  tripId: String;
  fname: String;
  lname: String;
}
export { IAttendeeModel };
