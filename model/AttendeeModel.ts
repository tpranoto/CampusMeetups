
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
                studentId: String,
                tripId: String,
                fname: String,
                lname: String,
                email: String,
                phoneNumber: String,
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
        const id = crypto.randomBytes(16).toString("hex"); // Generate a unique attendee ID
        attendeeObj.attendeeId = id; // Set the attendee ID

        try {
            await this.model.create([attendeeObj]); // Save the attendee to the database
            return attendeeObj; // Return the created attendee
        } catch (e) {
            console.error(e);
            const msg = `Failed to create attendee ${JSON.stringify(attendeeObj)}`; // Prepare error message
            throw new Error("Error creating Attendees")
           
        }
    }
    // Retrieve the Attendees of a trip  using tripId
    public async retrieveAllAttendees(tripId: string): Promise<any> {
        try {
            const query = this.model.find({ tripId: tripId }).select("-_id -__v");
            const students = await query.exec();
            return students;
        } catch (e) {
            console.error(e);
            throw new Error("Error retrieving attendees.");
        }
    }

    // Retrieve the trip(s) for a student using studentId
    public async retrieveTrips(studentId: string): Promise<any> {
        try {
            const query = this.model.find({ studentId: studentId }).select("-_id -__v");
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
            const result = await this.model.deleteOne({ studentId: studentId, tripId: tripId});
            if (result.deletedCount > 0) {
                return { message: "Attendee deleted successfully." };
            } else {
                throw new Error("Attendee not found.");
            }
        } catch (e) {
            console.error(e);
            throw new Error("Error deleting attendee.");
        }
    }


}

export { AttendeeModel };
