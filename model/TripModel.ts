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
        tripId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        description: String,
        status: {
          type: String,
          enum: ["Ongoing", "Completed", "Cancelled"],
          required: true,
          default: "Ongoing",
        },
        image: String,
        location: String,
        timestamp: Date,
        organizerId: {
          type: String,
          required: true,
        },
        categoryId: {
          type: String,
          required: true,
        },
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
      const createdTrip = await this.model.create(tripObj);
      const cleanedTripObj = createdTrip.toObject();
      delete cleanedTripObj._id;
      delete cleanedTripObj.__v;
      response.json(cleanedTripObj);
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
          localField: "attendee.studentId",
          foreignField: "studentId",
          as: "student",
        },
      },
      {
        $unwind: {
          path: "$student",
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
            timestamp: "$timestamp",
            organizer: {
              organizerId: "$organizer.studentId",
              fname: "$organizer.fname",
              lname: "$organizer.lname",
              image: "$organizer.image",
            },
            category: {
              categoryId: "$category.categoryId",
              name: "$category.name",
            },
          },
          attendees: {
            $push: {
              studentId: "$attendee.studentId",
              fname: "$student.fname",
              lname: "$student.lname",
              image: "$student.image",
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
          timestamp: "$_id.timestamp",
          organizerId: "$_id.organizer.organizerId",
          organizerData: {
            fname: "$_id.organizer.fname",
            lname: "$_id.organizer.lname",
            image: "$_id.organizer.image",
          },
          categoryId: "$_id.category.categoryId",
          categoryData: {
            name: "$_id.category.name",
          },
          attendees: "$attendees",
        },
      },
    ]);
    try {
      const result = await query.exec();
      if (result.length === 0) {
        return response.json({});
      }
      var resultObj = result[0];
      // FIXME: correct empty object when empty attendees with proper solution
      if (
        resultObj.attendees != null &&
        resultObj.attendees.length === 1 &&
        resultObj.attendees[0].studentId === undefined
      ) {
        resultObj.attendees = [];
      }

      response.json(resultObj);
    } catch (e) {
      console.error(e);
      var msg = `failed to retrieve trip ${tripId}`;
      response.status(500).json({ error: msg });
    }
  }

  public async retrieveTripsOrganizedById(
    response: any,
    studentId: string,
    limit: number | null
  ) {
    var query = this.model.aggregate([
      {
        $match: { organizerId: studentId, status: "Ongoing" },
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
          timestamp: 1,
          organizerId: 1,
          organizerData: {
            fname: "$organizer.fname",
            lname: "$organizer.lname",
          },
          categoryId: 1,
          categoryData: {
            name: "$category.name",
          },
        },
      },
    ]);
    if (limit != null) {
      query.limit(limit);
    }
    try {
      const itemArray = await query.exec();
      response.json(itemArray);
    } catch (e) {
      console.error(e);
      var msg = `failed to retrieve trips organized by ${studentId}`;
      response.status(500).json({ error: msg });
    }
  }

  public async retrieveAllTrips(
    response: any,
    path: string,
    searchedName: string,
    organizerId: string,
    catId: string,
    perPage: number,
    page: number,
    expand: boolean
  ): Promise<any> {
    var filter: { [key: string]: any } = { status: "Ongoing" };
    if (searchedName != null) {
      filter = { name: { $regex: searchedName, $options: "i" } };
    }

    if (organizerId != null) {
      filter = { organizerId: organizerId };
    }

    if (expand) {
      return this.retrieveExpandedAllTrips(
        response,
        path,
        filter,
        catId,
        perPage,
        page,
        expand,
        ""
      );
    } else {
      return this.retrieveSimpleAllTrips(
        response,
        path,
        filter,
        catId,
        perPage,
        page,
        expand,
        ""
      );
    }
  }

  public async retrieveSimpleAllTrips(
    response: any,
    path: string,
    baseFilter: Object,
    catId: string,
    perPage: number,
    page: number,
    expand: boolean,
    sortFilter: string
  ): Promise<any> {
    var filter: { [key: string]: any } = baseFilter;
    if (catId != null) {
      filter.categoryId = catId;
    }
    var query = this.model.find(filter);
    if (sortFilter != null) {
      if (sortFilter === "asc") {
        query.sort({ timestamp: 1 });
      } else if (sortFilter === "desc") {
        query.sort({ timestamp: -1 });
      }
    }

    query.skip(page * perPage);
    query.limit(perPage + 1); // add 1 more to calculate next page in pagination
    query.select("-_id -__v");
    try {
      const itemArray = await query.exec();
      response.json(
        this.contructAllTripsResponse(
          path,
          itemArray,
          catId,
          page,
          perPage,
          expand
        )
      );
    } catch (e) {
      console.error(e);
      var msg = `failed to retrieve trips`;
      response.status(500).json({ error: msg });
    }
  }

  public async retrieveExpandedAllTrips(
    response: any,
    path: string,
    baseFilter: Object,
    catId: string,
    perPage: number,
    page: number,
    expand: boolean,
    sortFilter: string
  ): Promise<any> {
    var filter: { [key: string]: any } = baseFilter;
    if (catId != null) {
      filter.categoryId = catId;
    }

    var queryString: any[] = [
      {
        $match: filter,
      },
      {
        $skip: page * perPage,
      },
      {
        $limit: perPage + 1, // add 1 more to calculate next page in pagination
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
          timestamp: 1,
          organizerId: 1,
          organizerData: {
            fname: "$organizer.fname",
            lname: "$organizer.lname",
          },
          categoryId: 1,
          categoryData: {
            name: "$category.name",
          },
        },
      },
    ];

    if (sortFilter != null) {
      if (sortFilter === "asc") {
        queryString.push({
          $sort: { timestamp: 1 },
        });
      } else if (sortFilter === "desc") {
        queryString.push({
          $sort: { timestamp: -1 },
        });
      }
    }

    var query = this.model.aggregate(queryString);

    try {
      const itemArray = await query.exec();
      response.json(
        this.contructAllTripsResponse(
          path,
          itemArray,
          catId,
          page,
          perPage,
          expand
        )
      );
    } catch (e) {
      console.error(e);
      var msg = `failed to retrieve trips`;
      response.status(500).json({ error: msg });
    }
  }

  public async updateTrip(
    response: any,
    tripId: string,
    studentId: string,
    tripObj: any
  ) {
    var query = this.model.findOneAndUpdate(
      { tripId: tripId, organizerId: studentId },
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

  public async deleteTrip(response: any, tripId: string, studentId: string) {
    var query = this.model.deleteOne({
      tripId: tripId,
      organizerId: studentId,
    });
    try {
      await query.exec();
      response.json({ message: "OK" });
    } catch (e) {
      console.error(e);
      var msg = `failed to delete trip ${tripId}`;
      response.status(500).json({ error: msg });
    }
  }

  public async deleteTripTest(response: any, tripId: string) {
    var query = this.model.deleteOne({
      tripId: tripId,
    });
    try {
      await query.exec();
      response.json({ message: "OK" });
    } catch (e) {
      console.error(e);
      var msg = `failed to delete trip ${tripId}`;
      response.status(500).json({ error: msg });
    }
  }

  public async retrieveUpcomingActiveTrips(
    response: any,
    path: string,
    days: number,
    catId: string,
    perPage: number,
    page: number,
    expand: boolean,
    sortFilter: string
  ) {
    const today = new Date();
    const upcomingDays = new Date(today);
    upcomingDays.setDate(today.getDate() + days);

    var filter = {
      timestamp: { $gte: today, $lte: upcomingDays },
      status: "Ongoing",
    };

    if (expand) {
      return this.retrieveExpandedAllTrips(
        response,
        path,
        filter,
        catId,
        perPage,
        page,
        expand,
        sortFilter
      );
    } else {
      return this.retrieveSimpleAllTrips(
        response,
        path,
        filter,
        catId,
        perPage,
        page,
        expand,
        sortFilter
      );
    }
  }

  private contructNextPageUrl(
    path: string,
    dataLen: number,
    catId: string,
    page: number,
    perPage: number,
    expand: boolean
  ): string | null {
    if (dataLen <= perPage) {
      return null;
    }

    return this.constructPageUrl(path, catId, page, perPage, expand);
  }

  private constructPrevPageUrl(
    path: string,
    catId: string,
    page: number,
    perPage: number,
    expand: boolean
  ): string | null {
    if (page < 0) {
      return null;
    }

    return this.constructPageUrl(path, catId, page, perPage, expand);
  }

  private constructPageUrl(
    path: string,
    catId: string,
    page: number,
    perPage: number,
    expand: boolean
  ): string | null {
    var paginationUrl = path + "?page=" + page + "&perPage=" + perPage;

    if (catId != null) {
      paginationUrl += "&categoryId=" + catId;
    }

    if (expand) {
      paginationUrl += "&expand=true";
    }

    return paginationUrl;
  }

  private contructAllTripsResponse(
    path: string,
    itemArray: Array<Object>,
    catId: string,
    page: number,
    perPage: number,
    expand: boolean
  ): Object {
    var nextPage = page + 1;
    var prevPage = page - 1;
    var arrayLen = itemArray.length;
    if (arrayLen > perPage) {
      itemArray.pop(); // remove extra element in array that used for pagination logic
    }

    return {
      data: itemArray,
      page: page,
      perPage: perPage,
      nextPage: this.contructNextPageUrl(
        path,
        arrayLen,
        catId,
        nextPage,
        perPage,
        expand
      ),
      prevPage: this.constructPrevPageUrl(
        path,
        catId,
        prevPage,
        perPage,
        expand
      ),
    };
  }
}

export { TripModel };
