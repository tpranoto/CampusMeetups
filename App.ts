import express from "express";
import * as bodyParser from "body-parser";
import { TripModel } from "./model/TripModel";
import * as crypto from "crypto";

// Creates and configures an ExpressJS web server.
class App {
  // Ref to Express instance
  public expressApp: express.Application;
  public Trip: TripModel;

  // Run configuration methods on the Express instance.
  constructor(mongoDBConnection: string) {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Trip = new TripModel(mongoDBConnection);
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

    this.expressApp.use("/", router);

    // this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    // this.expressApp.use('/images', express.static(__dirname+'/img'));
    // this.expressApp.use('/', express.static(__dirname+'/pages'));
  }
}

export { App };
