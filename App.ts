import express from "express";
import * as bodyParser from "body-parser";
import { TripModel } from "./model/TripModel";
import { AttendeeModel } from "./model/AttendeeModel";
import { ReportModel } from "./model/ReportModel";
import { StudentModel } from "./model/StudentModel";
import { CategoryModel } from "./model/CategoryModel";

// Creates and configures an ExpressJS web server.
class App {
  // Ref to Express instance
  public expressApp: express.Application;
  public Trip: TripModel;
  public Attendee: AttendeeModel;
  public Student: StudentModel;
  public Report: ReportModel;
  public Category: CategoryModel;

  // Run configuration methods on the Express instance.
  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Trip = new TripModel(mongoDBConnection);
    this.Attendee = new AttendeeModel(mongoDBConnection);
    this.Student = new StudentModel(mongoDBConnection);
    this.Report = new ReportModel(mongoDBConnection);
    this.Category = new CategoryModel(mongoDBConnection);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    ///////TRIP///////

    // Create new trip
    router.post("/app/trip", async (req, res) => {
      var jsonObj = req.body;
      console.log(`Create new trip with: ${JSON.stringify(req.body)}`);
      await this.Trip.createTrip(res, jsonObj);
    });

    router.get("/app/trip/:tripId", async (req, res) => {
      var tripId = req.params.tripId;
      console.log(`Retrieve trip ${tripId}`);
      await this.Trip.retrieveTrip(res, tripId);
    });
    // Get multiple trips with pagination
    router.get("/app/trip", async (req, res) => {
      try {
        var query: any = req.query;
        var perPage =
          query.perPage !== undefined ? parseInt(query.perPage) : 20;
        if (isNaN(perPage) || perPage <= 0) {
          res.status(400).json({ error: "perPage must be a positive integer" });
          return;
        }
        var page = query.page !== undefined ? parseInt(query.page) : 0;
        if (isNaN(page) || page < 0) {
          res.status(400).json({ error: "page must be 0 or larger" });
          return;
        }
        // category filter
      } catch (e) {
        res.status(400).json({ error: "bad query params" });
        return;
      }
      console.log("Query multiple trips");
      await this.Trip.retrieveAllTrips(res, perPage, page);
    });
    // Update a trip with tripId
    router.patch("/app/trip/:tripId", async (req, res) => {
      var tripId = req.params.tripId;
      var jsonObj = req.body;
      console.log(`Update trip ${tripId} with: ${JSON.stringify(jsonObj)}`);
      await this.Trip.updateTrip(res, tripId, jsonObj);
    });
    // Delete a trip with tripId
    router.delete("/app/trip/:tripId", async (req, res) => {
      var tripId = req.params.tripId;
      console.log(`Delete trip ${tripId}`);
      await this.Trip.deleteTrip(res, tripId);
    });

    ///////CATEGORY///////

    //Create category
    router.post("/app/category", async (req, res) => {
      const jsonObj = req.body;
      console.log(`Create new category with: ${JSON.stringify(req.body)}`);
      try {
        await this.Category.createCategory(res, jsonObj);
      } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Failed to create category" });
      }
    });
    //Get a category
    router.get("/app/category/:categoryId", async (req, res) => {
      const categoryId = req.params.categoryId;
      console.log(`Retrieve category ${categoryId}`);
      try {
        await this.Category.retrieveCategory(res, categoryId);
      } catch (error) {
        console.error("Error retrieving category:", error);
        res.status(500).json({ error: "Failed to retrieve category" });
      }
    });
    //Get all the categories
    router.get("/app/category", async (req, res) => {
      console.log(`Retrieve all categories`);
      try {
        await this.Category.retrieveAllCategories(res);
      } catch (error) {
        console.error("Error retrieving categories:", error);
        res.status(500).json({ error: "Failed to retrieve all categories" });
      }
    });
    //Delete Category
    router.delete("/app/category/:categoryId", async (req, res) => {
      var categoryId = req.params.categoryId;
      console.log(`Delete category ${categoryId}`);
      await this.Category.deleteCategory(res, categoryId);
    });

    ///////STUDENT///////

    // Create a new student
    router.post("/app/student", async (req, res) => {
      const jsonObj = req.body;
      console.log(`Create student: ${JSON.stringify(jsonObj)}`);
      try {
        const student = await this.Student.createStudent(jsonObj);
        res.json(student);
      } catch (e) {
        console.error(e);
        res.json({ error: "Error creating a students." }).status(500);
      }
    });
    // Get All Students
    router.get("/app/student", async (req, res) => {
      console.log("Query all students");
      try {
        const allStudents = await this.Student.retrieveAllStudents();
        res.json(allStudents);
      } catch (e) {
        console.error(e);
        res.json({ error: "Error fetching all students." }).status(500);
      }
    });
    // Get a student with studentId
    router.get("/app/student/:studentId", async (req, res) => {
      const studentId = req.params.studentId;
      console.log(`Query single student with id: ${studentId}`);
      try {
        const studentDetails = await this.Student.retrieveStudentDetails({
          studentId: studentId,
        });
        res.json(studentDetails);
      } catch (e) {
        console.error(e);
        res.json({ error: "Error fetching student details." }).status(500);
      }
    });
    // Update a student details with studentId
    router.put("/app/student/:id", async (req, res) => {
      const studentId = req.params.id;
      const updateData = req.body;
      try {
        const responseMessage = await this.Student.updateStudentDetails(
          studentId,
          updateData
        );
        res.json(responseMessage);
      } catch (e) {
        console.error(e);
        res.json({ error: `Error updating student.` }).status(500);
      }
    });
    // Delete a student with studentId
    router.delete("/app/student/:studentId", async (req, res) => {
      const studentId = req.params.studentId;
      try {
        const result = await this.Student.deleteStudent(studentId);
        res.json(result);
      } catch (e) {
        console.error(e);
        res.json({ error: "Error Deleting." }).status(500);
      }
    });

    ///////REPORT///////

    // Create new report
    router.post("/app/report", async (req, res) => {
      var jsonObj = req.body;
      console.log(jsonObj);
      try {
        const result = await this.Report.createReport(jsonObj);
        res.json(result);
      } catch (e) {
        console.error(e);
        res.json({ error: "Error creating student." }).status(500);
      }
    });
    // Get all reports
    router.get("/app/report", async (req, res) => {
      console.log("Query all reports");
      try {
        const allReports = await this.Report.retrieveAllReports();
        res.json(allReports);
      } catch (e) {
        console.error(e);
        res.json({ error: "Error fetching all reports." }).status(500);
      }
    });
    // Get single report by reportId
    router.get("/app/report/:reportId", async (req, res) => {
      const reportId = req.params.reportId;
      try {
        const reportDetails = await this.Report.getReportDetails(reportId);
        res.json(reportDetails);
      } catch (e) {
        console.error(e);
        res.json({ error: "Error fetching report." }).status(500);
      }
    });
    // Update report with reportId
    router.put("/app/report/:reportId", async (req, res) => {
      const reportId = req.params.reportId;
      const updateData = req.body;

      try {
        const responseMessage = await this.Report.updateReportDetails(
          reportId,
          updateData
        );
        res.json(responseMessage);
      } catch (e) {
        console.error(e);
        res.json({ error: "Error updating report." }).status(500);
      }
    });
    // Delete report by reportId
    router.delete("/app/report/:reportId", async (req, res) => {
      const reportId = req.params.reportId;
      try {
        const result = await this.Report.deleteReport(reportId);
        res.json(result);
      } catch (e) {
        console.error(e);
        res.json({ error: "Error deleting report." }).status(500);
      }
    });

    ///////ATTENDEE///////

    // Get an attendee
    router.get("/app/attendee/:studentId", async (req, res) => {
      var studentId = req.params.studentId;
      console.log(`Retrieve Trips that a student is attending ${studentId}`);
      try {
        const Trips = await this.Attendee.retrieveAttendedTrips(studentId);
        res.json(Trips);
      } catch (e) {
        console.error(e);
        res
          .json({
            error: `Error fetching trips for an attendee ${studentId}`,
          })
          .status(500);
      }
    });
    // Retrieve Students Attending a Specific Trip
    router.get("/app/attendee/trip/:tripId", async (req, res) => {
      var tripId = req.params.tripId;
      console.log(`Retrieve Students attending the trip ${tripId}`);
      try {
        const attendees = await this.Attendee.retrieveAllAttendees(tripId);
        res.json(attendees);
      } catch (e) {
        console.error(e);
        res
          .json({ error: `Error fetching attendees for trip ${tripId}` })
          .status(500);
      }
    });
    // Create a New Attendee
    router.post("/app/attendee", async (req, res) => {
      const attendeeObj = req.body;
      console.log(`Creating a new attendee for ${JSON.stringify(attendeeObj)}`);
      try {
        // Assuming there's a method to create an attendee in your AttendeeModel
        const newAttendee = await this.Attendee.createAttendee(attendeeObj);
        res.json(newAttendee);
      } catch (e) {
        console.error(e);
        res
          .json({
            error: `Error creating attendee for ${JSON.stringify(attendeeObj)}`,
          })
          .status(500);
      }
    });
    // Delete an Attendee
    router.delete("/app/attendee/:studentId/trip/:tripId", async (req, res) => {
      const studentId = req.params.studentId; // Get studentId from route parameters
      const tripId = req.params.tripId;
      console.log(`Deleting attendee ${studentId} from trip ${tripId}`);
      try {
        const result = await this.Attendee.deleteAttendee(studentId, tripId);
        res.json(result);
      } catch (e) {
        console.error(e);
        res
          .json({
            error: `Error deleting attendee ${studentId} from trip ${tripId}`,
          })
          .status(500);
      }
    });

    this.expressApp.use("/", router);

    this.expressApp.use("/", express.static(__dirname + "/pages"));
  }
}

export { App };
