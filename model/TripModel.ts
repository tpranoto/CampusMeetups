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
    var query = this.model.findOne({ tripId: tripId });
    query.select("-_id -__v"); // filter out _id & __v fields
    try {
      const result = await query.exec();
      if (!result) {
        response.json({});
      }
      response.json(result);
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
    var query = this.model.find(filter);
    query.limit(perPage);
    query.skip(page * perPage);
    query.select("-_id -__v"); // filter out _id & __v fields
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
