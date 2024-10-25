import * as Mongoose from "mongoose";
import { ITripModel } from "../interface/ITripModel";

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
}

export { TripModel };
