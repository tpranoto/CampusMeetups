import express from "express";
import * as bodyParser from "body-parser";
import { TripModel } from "./model/TripModel";
import { ReportModel } from "./model/ReportModel";
import * as crypto from "crypto";

// Creates and configures an ExpressJS web server.
class App {
  // Ref to Express instance
  public expressApp: express.Application;
  public Trip: TripModel;
  public Report: ReportModel;

  // Run configuration methods on the Express instance.
  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Trip = new TripModel(mongoDBConnection);
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

    router.post("/app/trip/", async (req, res) => {
      const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
      var jsonObj = req.body;
      jsonObj.tripId = id;
      try {
        await this.Trip.model.create([jsonObj]);
        res.send('{"id":"' + id + '"}');
      } catch (e) {
        console.error(e);
        console.log("object creation failed");
        }
    });

    //Report creation route
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
      // Get All Reports
      router.get('/app/reports/', async (req, res) => {
          console.log('Query all reports');

          try {
              const allReports = await this.Report.retrieveAllReports();
              res.json(allReports);
          } catch (e) {
              console.error(e);
              res.send("Error fetching all reports.");
          }
      });

      // Update Report
      router.put("/app/report/:id", async (req, res) => {
          const reportId = req.params.id;
          const updateData = req.body;

          try {
              const responseMessage = await this.Report.updateReportDetails(reportId, updateData);
              res.json(responseMessage);
          } catch (e) {
              console.error(e);
              res.send("Error Updating.");
          }
      });

      // Delete Report by ID
      router.delete("/app/report/:id", async (req, res) => {
          const reportId = req.params.id;
          try {
              const result = await this.Report.deleteReport(reportId);
              res.send(result.message);
          } catch (e) {
              console.error(e);
              res.send("Error Deleting.");
          }
      });

      // Get Single Report by ID
      router.get("/app/report/:id", async (req, res) => {
          const reportId = req.params.id;
          try {
              const reportDetails = await this.Report.getReportDetails(reportId);
              res.json(reportDetails);
          } catch (e) {
              console.error(e);
              res.send("Error fetching report.");
          }
      });




    this.expressApp.use("/", router);

    this.expressApp.use("/", express.static(__dirname + "/pages"));
  }
}

export { App };
