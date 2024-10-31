import mongoose from "mongoose";

interface IStudentModel extends mongoose.Document {
    studentId: String,
    fname: String,
    lname: String,
    email: String,
    phoneNumber: String,
    verified: Boolean,
    status: String,
}
export { IStudentModel };
