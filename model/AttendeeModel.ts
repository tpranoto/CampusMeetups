import * as Mongoose from "mongoose";
import { IAttendeeModel } from "../interface/IAttendeeModel";
import * as crypto from "crypto";

class AttendeeModel {
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
        tripId: {
          type: String,
          required: true,
        },
      },
      { collection: "Attendee" }
    );
  }

  public async createModel() {
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<IAttendeeModel>("Attendee", this.schema);
    } catch (e) {
      console.error(e);
    }
  }

  // Create a new attendee similar to createTrip
  public async createAttendee(attendeeObj: any) {
    var query = this.model.findOne({
      tripId: attendeeObj.tripId,
      studentId: attendeeObj.studentId,
    });
    query.select("-_id -__v");
    try {
      const existingAttendee = await query.exec();

      if (existingAttendee) {
        return existingAttendee;
      }

      await this.model.create([attendeeObj]); // Save the attendee to the database
      return attendeeObj; // Return the created attendee
    } catch (e) {
      console.error(e);
      throw new Error("Error creating Attendees");
    }
  }
  // Retrieve the Attendees of a trip  using tripId
  public async retrieveAllAttendees(tripId: string): Promise<any> {
    try {
      const query = this.model.aggregate([
        {
          $match: { tripId: tripId },
        },
        {
          $lookup: {
            from: "Student",
            localField: "studentId",
            foreignField: "studentId",
            as: "student",
          },
        },
        {
          $unwind: "$student",
        },
        {
          $project: {
            _id: 0,
            studentId: 1,
            tripId: 1,
            studentData: {
              studentId: "$student.studentId",
              fname: "$student.fname",
              lname: "$student.lname",
              image: "$student.image",
            },
          },
        },
      ]);
      const students = await query.exec();
      return students;
    } catch (e) {
      console.error(e);
      throw new Error("Error retrieving attendees.");
    }
  }

  // Retrieve the trip(s) for a student using studentId
  public async retrieveAttendedTrips(
    studentId: string,
    limit: number | null
  ): Promise<any> {
    try {
      const query = this.model.aggregate([
        {
          $match: { studentId: studentId },
        },
        {
          $lookup: {
            from: "Trip",
            localField: "tripId",
            foreignField: "tripId",
            as: "trip",
          },
        },
        {
          $unwind: "$trip",
        },
        {
          $lookup: {
            from: "Category",
            localField: "trip.categoryId",
            foreignField: "categoryId",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            _id: 0,
            studentId: 1,
            tripId: 1,
            tripData: {
              tripId: "$trip.tripId",
              name: "$trip.name",
              description: "$trip.description",
              image: "$trip.image",
              status: "$trip.status",
              location: "$trip.location",
              timestamp: "$trip.timestamp",
              categoryId: "$trip.categoryId",
              categoryData: {
                name: "$category.name",
              },
            },
          },
        },
      ]);
      if (limit != null) {
        query.limit(limit);
      }

      const trips = await query.exec();
      return trips;
    } catch (e) {
      console.error(e);
      throw new Error("Error retrieving trips.");
    }
  }

  // Delete Attendee by studentId and tripId
  public async deleteAttendee(studentId: string, tripId: string): Promise<any> {
    try {
      await this.model.deleteOne({ studentId: studentId, tripId: tripId });
      return { message: "OK" };
    } catch (e) {
      console.error(e);
      throw new Error("Error deleting attendee.");
    }
  }

  public async deleteAttendedTrips(studentId: string): Promise<any> {
    try {
      await this.model.deleteMany({ studentId: studentId });
      return { message: "OK" };
    } catch (e) {
      console.error(e);
      throw new Error(`Error deleting trips attended by ${studentId}`);
    }
  }

  public async deleteAttendeesFromTrips(tripId: string): Promise<any> {
    try {
      await this.model.deleteMany({ tripId: tripId });
      return { message: "OK" };
    } catch (e) {
      console.error(e);
      throw new Error(`Error deleting trips attended by ${e}`);
    }
  }
}

export { AttendeeModel };
