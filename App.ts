import express from "express";
import * as bodyParser from "body-parser";
import { TripModel } from "./model/TripModel";
import { AttendeeModel } from "./model/AttendeeModel";
import { ReportModel } from "./model/ReportModel";
import { StudentModel } from "./model/StudentModel";
import { CategoryModel } from "./model/CategoryModel";
import passport from "passport";
import MicrosoftPassportObj from "./MicrosoftPassport";
import session from "express-session";
import cookieParser from "cookie-parser";

// Creates and configures an ExpressJS web server.
class App {
  // Ref to Express instance
  public expressApp: express.Application;
  public micPassportObj: MicrosoftPassportObj;
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

    this.micPassportObj = new MicrosoftPassportObj(this.Student);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: true }));
    this.expressApp.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      next();
    });
    this.expressApp.use(
      session({
        secret: "keyboard cat warrior",
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 1 * 60 * 60 * 1000, //1hr
        },
      })
    );
    this.expressApp.use(cookieParser());
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());
  }

  private validateAuth(req: any, res: any, next: any): void {
    if (req.isAuthenticated()) {
      console.log("user is authenticated");
      return next();
    }
    console.log("user is not authenticated");
    res.json({ error: "user is not authenticated" });
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get(
      "/app/login",
      passport.authenticate("microsoft", { prompt: "select_account" })
    );

    router.get(
      "/auth/outlook/callback",
      passport.authenticate("microsoft", { failureRedirect: "/#/login" }),
      (req, res) => {
        console.log(
          "successfully authenticated user and returned to callback page."
        );
        res.cookie("user", JSON.stringify(req.user));
        res.redirect("/");
      }
    );

    router.get("/app/logout", (req, res) => {
      req.logout(function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "error during logout" });
        }

        req.session.destroy(function (err) {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "error destroying session" });
          }

          res.clearCookie("user");
          res.clearCookie("connect.sid");
          // res.redirect("/");
          return res.json({ message: "logout successful" });
        });
      });
    });

    ///////TRIP///////

    // Create new trip
    router.post("/app/trip", this.validateAuth, async (req, res) => {
      var jsonObj = req.body;
      console.log(`Create new trip with: ${JSON.stringify(req.body)}`);
      await this.Trip.createTrip(res, jsonObj);
    });

    // Get upcoming trips by days
    router.get("/app/trip/upcoming", this.validateAuth, async (req, res) => {
      try {
        var query: any = req.query;
        var categoryId = query.categoryId;
        if (query.days === undefined) {
          res.status(400).json({ error: "days param must be a provided" });
          return;
        }
        var days = parseInt(query.days);
        if (days <= 0) {
          res.status(400).json({ error: "days must be a positive integer" });
          return;
        }
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

        var sort =
          query.sort === undefined ? undefined : query.sort.toLowerCase();
        if (sort != null && sort !== "asc" && sort !== "desc") {
          res.status(400).json({ error: "sort must be either asc or desc" });
          return;
        }

        var expand =
          query.expand !== undefined
            ? JSON.parse(query.expand.toLowerCase())
            : false;
      } catch (e) {
        res.status(400).json({ error: "bad query params" });
        return;
      }
      console.log(`Retrieve upcoming Trips in ${days} days`);
      await this.Trip.retrieveUpcomingActiveTrips(
        res,
        days,
        categoryId,
        perPage,
        page,
        expand,
        sort
      );
    });
    // Get specific trip details by tripId
    router.get("/app/trip/:tripId", this.validateAuth, async (req, res) => {
      var tripId = req.params.tripId;
      console.log(`Retrieve trip ${tripId}`);
      await this.Trip.retrieveTrip(res, tripId);
    });
    // Get multiple trips with pagination
    router.get("/app/trip", this.validateAuth, async (req, res) => {
      try {
        var query: any = req.query;
        var name = query.name;
        var categoryId = query.categoryId;
        var organizerId = query.organizerId;
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

        var expand =
          query.expand !== undefined
            ? JSON.parse(query.expand.toLowerCase())
            : false;
      } catch (e) {
        res.status(400).json({ error: "bad query params" });
        return;
      }
      console.log("Query multiple trips");
      await this.Trip.retrieveAllTrips(
        res,
        name,
        organizerId,
        categoryId,
        perPage,
        page,
        expand
      );
    });
    // Update a trip with tripId
    router.patch("/app/trip/:tripId", this.validateAuth, async (req, res) => {
      var tripId = req.params.tripId;
      var jsonObj = req.body;
      var userDt: any = req.user;
      var studentId: string = userDt.studentId;
      console.log(`Update trip ${tripId} with: ${JSON.stringify(jsonObj)}`);
      await this.Trip.updateTrip(res, tripId, studentId, jsonObj);
    });
    // Delete a trip with tripId
    router.delete("/app/trip/:tripId", this.validateAuth, async (req, res) => {
      var tripId = req.params.tripId;
      var userDt: any = req.user;
      var studentId: string = userDt.studentId;
      console.log(`Delete trip ${tripId}`);
      await this.Attendee.deleteAttendeesFromTrips(tripId);
      await this.Trip.deleteTrip(res, tripId, studentId);
    });

    ///////CATEGORY///////

    //Create category
    router.post("/app/category", this.validateAuth, async (req, res) => {
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
    router.get(
      "/app/category/:categoryId",
      this.validateAuth,
      async (req, res) => {
        const categoryId = req.params.categoryId;
        console.log(`Retrieve category ${categoryId}`);
        try {
          await this.Category.retrieveCategory(res, categoryId);
        } catch (error) {
          console.error("Error retrieving category:", error);
          res.status(500).json({ error: "Failed to retrieve category" });
        }
      }
    );
    //Get all the categories
    router.get("/app/category", this.validateAuth, async (req, res) => {
      console.log(`Retrieve all categories`);
      try {
        await this.Category.retrieveAllCategories(res);
      } catch (error) {
        console.error("Error retrieving categories:", error);
        res.status(500).json({ error: "Failed to retrieve all categories" });
      }
    });
    //Delete Category
    router.delete(
      "/app/category/:categoryId",
      this.validateAuth,
      async (req, res) => {
        var categoryId = req.params.categoryId;
        console.log(`Delete category ${categoryId}`);
        await this.Category.deleteCategory(res, categoryId);
      }
    );

    ///////STUDENT///////

    // Create a new student
    router.post("/app/student", this.validateAuth, async (req, res) => {
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
    router.get("/app/student", this.validateAuth, async (req, res) => {
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
    router.get(
      "/app/student/id/:studentId",
      this.validateAuth,
      async (req, res) => {
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
      }
    );
    // Get a student with email
    router.get(
      "/app/student/email/:email",
      this.validateAuth,
      async (req, res) => {
        const email = req.params.email;
        console.log(`Query single student with email: ${email}`);
        try {
          const studentDetails = await this.Student.retrieveStudentDetails({
            email: email,
          });
          res.json(studentDetails);
        } catch (e) {
          console.error(e);
          res.json({ error: "Error fetching student details." }).status(500);
        }
      }
    );
    // Update a student details with studentId
    router.put("/app/student/:id", this.validateAuth, async (req, res) => {
      var userDt: any = req.user;
      var sesStudentId: string = userDt.studentId;
      const studentId = req.params.id;
      if (sesStudentId != studentId) {
        res.json({ error: "cant update other students info" });
      }
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
    router.delete(
      "/app/student/:studentId",
      this.validateAuth,
      async (req, res) => {
        var userDt: any = req.user;
        var sesStudentId: string = userDt.studentId;
        const studentId = req.params.studentId;
        if (sesStudentId != studentId) {
          res.json({ error: "cant delete other students info" });
        }
        try {
          const tripsDeleted = await this.Attendee.deleteAttendedTrips(
            studentId
          );
          const result = await this.Student.deleteStudent(studentId);
          res.json(result);
        } catch (e) {
          console.error(e);
          res.json({ error: "Error Deleting." }).status(500);
        }
      }
    );

    ///////REPORT///////

    // Create new report
    router.post("/app/report", this.validateAuth, async (req, res) => {
      var jsonObj = req.body;
      console.log(jsonObj);
      try {
        const result = await this.Report.createReport(jsonObj);
        res.json(result);
      } catch (e) {
        console.error(e);
        res.json({ error: "Error reporting student." }).status(500);
      }
    });
    // Get all reports
    router.get("/app/report", this.validateAuth, async (req, res) => {
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
    router.get("/app/report/:reportId", this.validateAuth, async (req, res) => {
      const reportId = req.params.reportId;
      try {
        const reportDetails = await this.Report.getReportDetails(reportId);
        if (reportDetails.length == 0) {
          res.json({});
        }
        res.json(reportDetails[0]);
      } catch (e) {
        console.error(e);
        res.json({ error: "Error fetching report." }).status(500);
      }
    });
    // Update report with reportId
    router.put("/app/report/:reportId", this.validateAuth, async (req, res) => {
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
    router.delete(
      "/app/report/:reportId",
      this.validateAuth,
      async (req, res) => {
        const reportId = req.params.reportId;
        try {
          const result = await this.Report.deleteReport(reportId);
          res.json(result);
        } catch (e) {
          console.error(e);
          res.json({ error: "Error deleting report." }).status(500);
        }
      }
    );

    ///////ATTENDEE///////

    // Get an attendee
    router.get(
      "/app/attendee/:studentId",
      this.validateAuth,
      async (req, res) => {
        var studentId = req.params.studentId;
        try {
          var query: any = req.query;
          var limit = query.limit !== undefined ? parseInt(query.limit) : null;
          if (limit !== null && limit <= 0) {
            res.status(400).json({ error: "limit must be a positive integer" });
            return;
          }
        } catch (e) {
          res.status(400).json({ error: "bad query params" });
          return;
        }

        console.log(`Retrieve Trips that a student is attending ${studentId}`);
        try {
          const Trips = await this.Attendee.retrieveAttendedTrips(
            studentId,
            limit
          );
          res.json(Trips);
        } catch (e) {
          console.error(e);
          res
            .json({
              error: `Error fetching trips for an attendee ${studentId}`,
            })
            .status(500);
        }
      }
    );
    // Retrieve Students Attending a Specific Trip
    router.get(
      "/app/attendee/trip/:tripId",
      this.validateAuth,
      async (req, res) => {
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
      }
    );
    // Create a New Attendee
    router.post("/app/attendee", this.validateAuth, async (req, res) => {
      const attendeeObj = req.body;
      console.log(`Creating a new attendee for ${JSON.stringify(attendeeObj)}`);
      try {
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
    router.delete(
      "/app/attendee/:studentId/trip/:tripId",
      this.validateAuth,
      async (req, res) => {
        const studentId = req.params.studentId;
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
      }
    );

    this.expressApp.use("/", router);

    this.expressApp.use(
      "/",
      express.static(__dirname + "/dist/campus-meetups/browser")
    );

    this.expressApp.all("*", (req, res) => {
      res.redirect("/");
    });
  }
}

export { App };
