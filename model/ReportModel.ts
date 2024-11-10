import * as Mongoose from "mongoose";
import { IReportModel } from "../interface/IReportModel";
import * as crypto from "crypto";

class ReportModel {
  public schema: any;
  public model: any;
  public dbConnectionString: string;

  public constructor(DB_CONNECTION_STRING: string) {
    this.dbConnectionString = DB_CONNECTION_STRING;
    this.createSchema();
    this.createModel();
  }

  public createSchema() {
    this.schema = new Mongoose.Schema(
      {
        reportId: {
          type: String,
          required: true,
        },
        reason: String,
        detail: String,
        status: {
          type: String,
          enum: ["Ongoing", "Resolved"],
          required: true,
          default: "Ongoing",
        },
        reporterId: {
          type: String,
          required: true,
        },
        reportedId: {
          type: String,
          required: true,
        },
      },
      { collection: "Report" }
    );
  }

  public async createModel() {
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<IReportModel>("Report", this.schema);
    } catch (e) {
      console.error(e);
    }
  }

  public async createReport(reportObj: any): Promise<any> {
    const id = crypto.randomBytes(16).toString("hex");
    reportObj.reportId = id;
    try {
      const createdObj = await this.model.create(reportObj);
      const cleanedObj = createdObj.toObject();
      delete cleanedObj._id;
      delete cleanedObj.__v;
      return cleanedObj;
    } catch (e) {
      console.error(e);
      throw new Error("Error creating report.");
    }
  }

  public async retrieveAllReports(): Promise<any[]> {
    try {
      const reports = this.model
        .aggregate([
          {
            $lookup: {
              from: "Student",
              localField: "reporterId",
              foreignField: "studentId",
              as: "reporter",
            },
          },
          {
            $unwind: "$reporter",
          },
          {
            $lookup: {
              from: "Student",
              localField: "reportedId",
              foreignField: "studentId",
              as: "reported",
            },
          },
          {
            $unwind: "$reported",
          },
          {
            $project: {
              _id: 0,
              reportId: 1,
              reason: 1,
              detail: 1,
              status: 1,
              reporterId: "$reporter.studentId",
              reporterData: {
                fname: "$reporter.fname",
                lname: "$reporter.lname",
              },
              reportedId: "$reported.studentId",
              reportedData: {
                fname: "$reported.fname",
                lname: "$reported.lname",
              },
            },
          },
        ])
        .exec();
      return reports;
    } catch (e) {
      console.error(e);
      throw new Error("Error retrieving reports.");
    }
  }
  public async updateReportDetails(
    reportId: string,
    updateData: any
  ): Promise<any> {
    try {
      const result = await this.model.updateOne(
        { reportId: reportId },
        { $set: updateData }
      );
      if (result.modifiedCount > 0) {
        updateData.reportId = reportId;
        return updateData;
      } else if (result.matchedCount === 0) {
        throw new Error("Report not found.");
      } else {
        throw new Error("No changes made to the report data.");
      }
    } catch (e) {
      console.error(e);
      throw new Error("Error updating report.");
    }
  }
  public async deleteReport(reportId: string): Promise<any> {
    try {
      await this.model.deleteOne({ reportId: reportId });
      return { message: "OK" };
    } catch (e) {
      console.error(e);
      throw new Error("Error deleting report.");
    }
  }
  public async getReportDetails(reportId: string): Promise<any> {
    try {
      const reportDetails = await this.model
        .aggregate([
          {
            $match: { reportId: reportId },
          },
          {
            $lookup: {
              from: "Student",
              localField: "reporterId",
              foreignField: "studentId",
              as: "reporter",
            },
          },
          {
            $unwind: "$reporter",
          },
          {
            $lookup: {
              from: "Student",
              localField: "reportedId",
              foreignField: "studentId",
              as: "reported",
            },
          },
          {
            $unwind: "$reported",
          },
          {
            $project: {
              _id: 0,
              reportId: 1,
              reason: 1,
              detail: 1,
              status: 1,
              reporterId: "$reporter.studentId",
              reporterData: {
                fname: "$reporter.fname",
                lname: "$reporter.lname",
              },
              reportedId: "$reported.studentId",
              reportedData: {
                fname: "$reported.fname",
                lname: "$reported.lname",
              },
            },
          },
        ])
        .exec();
      return reportDetails;
    } catch (e) {
      console.error(e);
      throw new Error("Error retrieving report.");
    }
  }
}

export { ReportModel };
