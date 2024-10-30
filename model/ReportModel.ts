import * as Mongoose from "mongoose";
import { IReportModel } from "../interface/IReportModel";

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
    public async retrieveAllReports(): Promise<any[]> {
        try {
            const reports = await this.model.find().exec();
            return reports;
        } catch (e) {
            console.error(e);
            throw new Error("Error retrieving reports.");
        }
    }
    public async updateReportDetails(reportId: string, updateData: Object): Promise<any> {
        try {
            const result = await this.model.updateOne({ reportId: reportId }, { $set: updateData });
            if (result.modifiedCount > 0) {
                return { message: "Report updated successfully." };
            } else if (result.matchedCount === 0) {
                throw new Error("Report not found.");
            } else {
                return { message: "No changes made to the report data." };
            }
        } catch (e) {
            console.error(e);
            throw new Error("Error updating report.");
        }
    }
    public async deleteReport(reportId: string): Promise<any> {
        try {
            const result = await this.model.deleteOne({ reportId: reportId });
            if (result.deletedCount > 0) {
                return { message: "Report deleted successfully." };
            } else {
                throw new Error("Report not found.");
            }
        } catch (e) {
            console.error(e);
            throw new Error("Error deleting report.");
        }
    }
    public async getReportDetails(reportId: string): Promise<any> {
        try {
            const reportDetails = await this.model.findOne({ reportId: reportId }).exec();
            if (!reportDetails) {
                throw new Error("Report not found.");
            }
            return reportDetails;
        } catch (e) {
            console.error(e);
            throw new Error("Error retrieving report.");
        }
    }
}

export { ReportModel };
