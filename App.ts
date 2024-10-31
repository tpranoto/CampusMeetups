import express from "express";
import * as bodyParser from "body-parser";
import { TripModel } from "./model/TripModel";
import { AttendeeModel } from "./model/AttendeeModel";

import { StudentModel } from "./model/StudentModel";
import * as crypto from "crypto";

// Creates and configures an ExpressJS web server.
class App {
  // Ref to Express instance
  public expressApp: express.Application;
  public Trip: TripModel;
  public Attendee: AttendeeModel;
  public Student: StudentModel;

  // Run configuration methods on the Express instance.
  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Trip = new TripModel(mongoDBConnection);
    this.Attendee = new AttendeeModel(mongoDBConnection);
      this.Trip = new TripModel(mongoDBConnection);
      this.Student = new StudentModel(mongoDBConnection); 
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

    router.patch("/app/trip/:tripId", async (req, res) => {
      var tripId = req.params.tripId;
      var jsonObj = req.body;
      console.log(`Update trip ${tripId} with: ${JSON.stringify(jsonObj)}`);
      await this.Trip.updateTrip(res, tripId, jsonObj);
    });

    router.delete("/app/trip/:tripId", async (req, res) => {
      var tripId = req.params.tripId;
      console.log(`Delete trip ${tripId}`);
      await this.Trip.deleteTrip(res, tripId);
    });
      // Student - Post
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


      // Student - Get
        router.get("/app/student/:id", async (req, res) => {
            const studentId = req.params.id;
            console.log("Query single student with id: " + studentId);
            try {
                const studentDetails = await this.Student.retrieveStudentDetails({ studentId: studentId });
                res.json(studentDetails); 
            } catch (e) {
                console.error(e);
                res.send("Error fetching student details.");
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



      // Student - PUT
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


      

      // Delete student by ID
      router.delete("/app/student/:id", async (req, res) => {
          const studentId = req.params.id;
          try {
              const result = await this.Student.deleteStudent(studentId);
              res.send(result.message);
          } catch (e) {
              console.error(e);
              res.send("Error Deleting.");
          }
      });

    router.get("/app/attendee/:studentId", async (req, res) => {
      var studentId = req.params.studentId;
      console.log(`Retrieve Trips that a student is attending ${studentId}`);
      try {
          const Trips = await this.Attendee.retrieveTrips(studentId );
          res.json(Trips); 
      } catch (e) {
          console.error(e);
          res.json({error: `Error fetching trips for an attendee ${studentId}`});
      }});

    // Retrieve Students Attending a Specific Trip
    router.get("/app/attendee/trip/:tripId", async (req, res) => {
      var tripId = req.params.tripId;
      console.log(`Retrieve Students attending the trip ${tripId}`);
      try {
          const attendees = await this.Attendee.retrieveAllAttendees(tripId);
          res.json(attendees);
      } catch (e) {
          console.error(e);
          res.json({ error: `Error fetching attendees for trip ${tripId}` });
      }
    });

          // Create a New Attendee
      router.post("/app/attendee", async (req, res) => {
        const { studentId, tripId, fname, lname, email, phoneNumber } = req.body;
        console.log(`Creating a new attendee for trip ${tripId}`);
        try {
            // Assuming there's a method to create an attendee in your AttendeeModel
            const newAttendee = await this.Attendee.createAttendee({
                studentId,
                tripId,
                fname,
                lname,
                email,
                phoneNumber,
            });
            res.status(201).json(newAttendee);
        } catch (e) {
            console.error(e);
            res.json({ error: `Error creating attendee for student ${studentId}` });
        }
      });

      // Delete an Attendee
      router.delete("/app/attendee/:studentId/trip/:tripId", async (req, res) => {
        const studentId = req.params.studentId;  // Get studentId from route parameters
        const tripId = req.params.tripId; 
        console.log(`Deleting attendee ${studentId} from trip ${tripId}`);
        try {
            const result = await this.Attendee.deleteAttendee(studentId, tripId);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.json({ error: `Error deleting attendee ${studentId} from trip ${tripId}` });
        }
      });


    this.expressApp.use("/", router);

    this.expressApp.use("/", express.static(__dirname + "/pages"));
  }
}

export { App };
