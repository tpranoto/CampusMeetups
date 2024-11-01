import * as Mongoose from "mongoose";
import { ITripModel } from "../interface/ITripModel";
import * as crypto from "crypto";

class TripModel {
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
        tripId: String,
        name: String,
        description: String,
        status: String,
        image: String,
        location: String,
        date: Date,
        organizerId: String,
        categoryId: String,
      },
      { collection: "Trip" }
    );
  }

  public async createModel() {
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<ITripModel>("Trip", this.schema);
    } catch (e) {
      console.error(e);
    }
  }

  public async createTrip(response: any, tripObj: any) {
    const id = crypto.randomBytes(16).toString("hex");
    tripObj.tripId = id;

    try {
      await this.model.create([tripObj]);
      response.json(tripObj);
    } catch (e) {
      console.error(e);
      var msg = `failed to create trip ${JSON.stringify(tripObj)}`;
      response.status(500).json({ error: msg });
    }
  }

  public async retrieveTrip(response: any, tripId: string) {
    var query = this.model.aggregate([
      {
        $match: { tripId: tripId },
      },
      {
        $lookup: {
          from: "Attendee",
          localField: "tripId",
          foreignField: "tripId",
          as: "attendee",
        },
      },
      {
        $unwind: {
          path: "$attendee",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "Student",
          localField: "organizerId",
          foreignField: "studentId",
          as: "organizer",
        },
      },
      {
        $unwind: "$organizer",
      },
      {
        $lookup: {
          from: "Category",
          localField: "categoryId",
          foreignField: "categoryId",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $group: {
          _id: {
            tripId: "$tripId",
            name: "$name",
            description: "$description",
            status: "$status",
            image: "$image",
            location: "$location",
            date: "$date",
            organizer: {
              organizerId: "$organizer.organizerId",
              fname: "$organizer.fname",
              lname: "$organizer.lname",
            },
            category: {
              categoryId: "$category.categoryId",
              name: "$category.name",
            },
          },
          attendees: {
            $push: {
              studentId: "$attendee.studentId",
              fname: "$attendee.fname",
              lname: "$attendee.lname",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          tripId: "$_id.tripId",
          name: "$_id.name",
          description: "$_id.description",
          status: "$_id.status",
          image: "$_id.image",
          location: "$_id.location",
          date: "$_id.date",
          organizer: "$_id.organizer",
          category: "$_id.category",
          attendees: 1,
        },
      },
    ]);
    try {
      const result = await query.exec();
      if (result.length == 0) {
        response.json({});
      }
      response.json(result[0]);
    } catch (e) {
      console.error(e);
      var msg = `failed to retrieve trip ${tripId}`;
      response.status(500).json({ error: msg });
    }
  }

  public async retrieveAllTrips(
    response: any,
    catId: string,
    perPage: number,
    page: number
  ): Promise<any> {
    var filter = {};
    if (catId != null) {
      filter = { categoryId: catId };
    }
    var query = this.model.aggregate([
      {
        $match: filter,
      },
      {
        $skip: page * perPage,
      },
      {
        $limit: perPage,
      },
      {
        $lookup: {
          from: "Student",
          localField: "organizerId",
          foreignField: "studentId",
          as: "organizer",
        },
      },
      {
        $unwind: "$organizer",
      },
      {
        $lookup: {
          from: "Category",
          localField: "categoryId",
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
          tripId: 1,
          name: 1,
          description: 1,
          status: 1,
          image: 1,
          location: 1,
          date: 1,
          organizer: {
            organizerId: "$organizer.studentId",
            fname: "$organizer.fname",
            lname: "$organizer.lname"
          },
          "category.categoryId": 1,
          "category.name": 1,
        },
      },
    ]);

    try {
      const itemArray = await query.exec();
      response.json({ data: itemArray, perPage: perPage, page: page });
    } catch (e) {
      console.error(e);
      var msg = `failed to retrieve trips`;
      response.status(500).json({ error: msg });
    }
  }

  public async updateTrip(response: any, tripId: string, tripObj: any) {
    var query = this.model.findOneAndUpdate(
      { tripId: tripId },
      { $set: tripObj },
      { new: true }
    );
    query.select("-_id -__v"); // filter out _id & __v fields
    try {
      const returnedObj = await query.exec();
      if (returnedObj != null) {
        response.json(returnedObj);
      } else {
        var msg = `trip ${tripId} not found`;
        console.error(msg);
        response.status(404).json({ error: msg });
      }
    } catch (e) {
      console.error(e);
      var msg = `failed to update trip ${JSON.stringify(tripObj)}`;
      response.status(500).json({ error: msg });
    }
  }

  public async deleteTrip(response: any, tripId: string) {
    var query = this.model.deleteOne({ tripId: tripId });
    try {
      await query.exec();
      response.json({ message: "OK" });
    } catch (e) {
      console.error(e);
      var msg = `failed to delete trip ${tripId}`;
      response.status(500).json({ error: msg });
    }
  }
}

export { TripModel };
