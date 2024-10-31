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
                reportId: String,
                reason: String,
                detail: String,
                status: String,
                reporterId: String,
                reportedId: String,
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

    public async createReport( reportObj:any ) : Promise<any> {
        const id = crypto.randomBytes(16).toString("hex");
        reportObj.reportId = id;
        try {
          await this.model.create([reportObj]);
          return reportObj;
        } catch (e) {
          console.error(e);
          throw new Error("Error creating report.");
        }
    } 

    public async retrieveAllReports(): Promise<any[]> {
        try {
            const reports = await this.model.find().select("-_id -__v").exec();
            return reports;
        } catch (e) {
            console.error(e);
            throw new Error("Error retrieving reports.");
        }
    }
    public async updateReportDetails(reportId: string, updateData: any): Promise<any> {
        try {
            const result = await this.model.updateOne({ reportId: reportId }, { $set: updateData });
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
            const reportDetails = await this.model.findOne({ reportId: reportId }).select("-_id -__v").exec();
            if (!reportDetails) {
                return {};
            }
            return reportDetails;
        } catch (e) {
            console.error(e);
            throw new Error("Error retrieving report.");
        }
    }
}

export { ReportModel };
