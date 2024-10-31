import express from "express";
import * as bodyParser from "body-parser";
import { TripModel } from "./model/TripModel";
import { ReportModel } from "./model/ReportModel";
import * as crypto from "crypto";
import { StudentModel } from "./model/StudentModel";

// Creates and configures an ExpressJS web server.
class App {
  // Ref to Express instance
  public expressApp: express.Application;
  public Trip: TripModel;
  public Student: StudentModel;
  public Report: ReportModel;

  // Run configuration methods on the Express instance.
  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Trip = new TripModel(mongoDBConnection);
    this.Student = new StudentModel(mongoDBConnection);
    this.Report = new ReportModel(mongoDBConnection);
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

    // Create a new student
    router.post("/app/student/", async (req, res) => {
      const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
      const jsonObj = req.body;
      jsonObj.studentId = id;
      try {
        await this.Student.model.create([jsonObj]);
        res.send('{"id":"' + id + '"}');
      } catch (e) {
        console.error(e);
        console.log("object creation failed");
      }
    });
      // Get All Students
      router.get('/app/students/', async (req, res) => {
          console.log('Query all students');
          try {
              const allStudents = await this.Student.retrieveAllStudents();
              res.json(allStudents);
          } catch (e) {
              console.error(e);
              res.send("Error fetching all students.");
          }
      });
    // Get a student with studentId
    router.get("/app/student/:studentId", async (req, res) => {
      const studentId = req.params.studentId;
      console.log("Query single student with id: " + studentId);
      try {
        const studentDetails = await this.Student.retrieveStudentDetails({
          studentId: studentId,
        });
        res.json(studentDetails);
      } catch (e) {
        console.error(e);
        res.send("Error fetching student details.");
      }
    });
    
      // Update a student details with studentId
      router.put("/app/student/:id", async (req, res) => {
          const studentId = req.params.id;
          const updateData = req.body;
          try {
              const responseMessage = await this.Student.updateStudentDetails(studentId, updateData);
              res.json(responseMessage);
          } catch (e) {
              console.error(e);
              res.send("Error Updating.");
          }
      });


    // Delete a student with studentId
    router.delete("/app/student/:studentId", async (req, res) => {
      const studentId = req.params.studentId;
      try {
        const result = await this.Student.deleteStudent(studentId);
        res.send(result.message);
      } catch (e) {
        console.error(e);
        res.send("Error Deleting.");
      }
    });

    // Create new report
    router.post("/app/report/", async (req, res) => {
      const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
      var jsonObj = req.body;
      jsonObj.reportId = id;
      try {
        await this.Report.model.create([jsonObj]);
        res.send('{"id":"' + id + '"}');
      } catch (e) {
        console.error(e);
        console.log("object creation failed");
      }
    });
    // Get all reports
    router.get("/app/report/", async (req, res) => {
      console.log("Query all reports");

      try {
        const allReports = await this.Report.retrieveAllReports();
        res.json(allReports);
      } catch (e) {
        console.error(e);
        res.send("Error fetching all reports.");
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
        res.send("Error fetching report.");
      }
    });
    // Update report with reportId
    router.patch("/app/report/:reportId", async (req, res) => {
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
        res.send("Error Updating.");
      }
    });
    // Delete report by reportId
    router.delete("/app/report/:reportId", async (req, res) => {
      const reportId = req.params.reportId;
      try {
        const result = await this.Report.deleteReport(reportId);
        res.send(result.message);
      } catch (e) {
        console.error(e);
        res.send("Error Deleting.");
      }
    });

    this.expressApp.use("/", router);

    this.expressApp.use("/", express.static(__dirname + "/pages"));
  }
}

export { App };
