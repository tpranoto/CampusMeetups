import * as Mongoose from "mongoose";
import { IStudentModel } from "../interface/IStudentModel";
import * as crypto from "crypto";

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
        studentId: {
          type: String,
          required: true,
        },
        fname: String,
        lname: String,
        email: {
          type: String,
          unique: true,
          required: true,
        },
        bio: {
          type: String,
          default: "",
        },
        image: {
          type: String,
          default: "",
        },
        phoneNumber: {
          type: String,
          default: "",
        },
        verified: {
          type: Boolean,
          default: false,
        },
        status: {
          type: String,
          enum: ["Active", "Inactive", "Banned"],
          default: "Active",
        },
        joined: {
          type: Date,
          default: new Date(),
        },
        ssoId: {
          type: String,
          unique: true,
          default: "",
        },
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

  public async retrieveOrCreateStudent(studentObj: any): Promise<any> {
    if (studentObj == null) {
      return;
    }

    const id = crypto.randomBytes(16).toString("hex");
    studentObj.studentId = id;
    const query = this.model.findOneAndUpdate(
      { ssoId: studentObj.ssoId },
      {
        $setOnInsert: studentObj,
      },
      { new: true, upsert: true }
    );
    query.select("-_id -__v");

    try {
      const user = await query.exec();
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Error finding or creating new student.");
    }
  }

  public async createStudent(studentObj: any): Promise<any> {
    const id = crypto.randomBytes(16).toString("hex");
    studentObj.studentId = id;
    try {
      const createdObj = await this.model.create(studentObj);
      const cleanedObj = createdObj.toObject();
      delete cleanedObj._id;
      delete cleanedObj.__v;
      return cleanedObj;
    } catch (e) {
      console.error(e);
      throw new Error("Error creating new student.");
    }
  }

  public async retrieveStudentDetails(filter: Object): Promise<any> {
    try {
      const studentDetails = await this.model
        .findOne(filter)
        .select("-_id -__v")
        .exec();
      if (!studentDetails) {
        return {};
      }
      return studentDetails;
    } catch (e) {
      console.error(e);
      throw new Error("Error retrieving student details.");
    }
  }

  public async retrieveAllStudents(): Promise<any> {
    try {
      const students = await this.model.find({}).select("-_id -__v").exec();
      return students;
    } catch (e) {
      console.error(e);
      throw new Error("Error retrieving all students.");
    }
  }

  public async updateStudentDetails(
    studentId: string,
    updateData: any
  ): Promise<any> {
    var query = this.model.findOneAndUpdate(
      { studentId: studentId },
      { $set: updateData },
      { new: true }
    );
    query.select("-_id -__v");
    try {
      const returnedObj = await query.exec();
      if (returnedObj != null) {
        return returnedObj;
      } else {
        throw new Error("Student not found");
      }
    } catch (e) {
      console.error(e);
      throw new Error("Error updating student.");
    }
  }

  // Delete Student by studentId
  public async deleteStudent(studentId: string): Promise<any> {
    try {
      await this.model.deleteOne({ studentId: studentId });
      return { message: "OK" };
    } catch (e) {
      console.error(e);
      throw new Error("Error deleting student.");
    }
  }
}

export { StudentModel };
