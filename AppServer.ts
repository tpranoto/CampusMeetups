import * as dotenv from "dotenv";
import { App } from "./App";

dotenv.config();

const port = process.env.PORT;
const dbProtocol = process.env.DB_PROTOCOL || "'mongodb://'";
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD!;
const mongoDBConnection =
  dbProtocol +
  dbUser +
  ":" +
  encodeURIComponent(dbPassword) +
  process.env.DB_INFO;

let server: any = new App(mongoDBConnection).expressApp;
server.listen(port);
console.log("server running in port " + port);
