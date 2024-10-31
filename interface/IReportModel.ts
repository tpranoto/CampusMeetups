import mongoose from "mongoose";

interface IReportModel extends mongoose.Document {

    reportId: String;
    reason: String;
    detail: String;
    status: String;
    reporterId: String;
    reportedId: String;
}
export { IReportModel };
