import * as Mongoose from "mongoose";
import { IStudentModel } from "../interface/IStudentModel";

class StudentModel {
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
                studentId: String,
                fname: String,
                lname: String,
                email: String,
                phoneNumber: String,
                verified: Boolean,
                status: String,
            },
            { collection: "Student" }
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IStudentModel>("Student", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

    public async retrieveStudentDetails(filter: Object): Promise<any> {
        try {
            const studentDetails = await this.model.findOne(filter).exec();
            if (!studentDetails) {
                throw new Error("Student not found.");
            }
            return studentDetails;
        } catch (e) {
            console.error(e);
            throw new Error("Error retrieving student details.");
        }
    }

    public async retrieveAllStudents(): Promise<any> {
        try {
            const students = await this.model.find({}).exec();
            return students;
        } catch (e) {
            console.error(e);
            throw new Error("Error retrieving all students.");
        }
    }
    public async updateStudentDetails(studentId: string, updateData: Object): Promise<any> {
        try {
            const result = await this.model.updateOne({ studentId: studentId }, { $set: updateData });
            if (result.modifiedCount > 0) {
                return { message: "Student updated successfully." };
            } else if (result.matchedCount === 0) {
                throw new Error("Student not found.");
            } else {
                return { message: "No changes made to the student data." };
            }
        } catch (e) {
            console.error(e);
            throw new Error("Error updating student.");
        }
    }

    // Delete Student by studentId
    public async deleteStudent(studentId: string): Promise<any> {
        try {
            const result = await this.model.deleteOne({ studentId: studentId });
            if (result.deletedCount > 0) {
                return { message: "Student deleted successfully." };
            } else {
                throw new Error("Student not found.");
            }
        } catch (e) {
            console.error(e);
            throw new Error("Error deleting student.");
        }
    }


}

export { StudentModel };
