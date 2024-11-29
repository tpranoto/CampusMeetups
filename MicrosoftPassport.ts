import passport from "passport";
import { StudentModel } from "./model/StudentModel";

let MicrosoftStrategy = require("passport-microsoft").Strategy;

// Creates a Passport configuration for Google
class MicrosoftPassport {
  clientId: string | undefined;
  secretId: string | undefined;

  constructor(studentModel: StudentModel) {
    this.clientId = process.env.OAUTH_AZURE_ID;
    this.secretId = process.env.OAUTH_AZURE_SECRET;

    passport.use(
      new MicrosoftStrategy(
        {
          clientID: this.clientId,
          clientSecret: this.secretId,
          tenant: "common",
          callbackURL: "/auth/outlook/callback",
          scope: ["openid", "profile", "email", "user.read"],
        },
        async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
          process.nextTick(async () => {
            var userData = {
              studentId: profile._json.id,
              fname: profile._json.givenName,
              lname: profile._json.surname,
              email: profile._json.userPrincipalName,
              phoneNumber: profile._json.mobilePhone || "",
            };
            const user = await studentModel.retrieveOrCreateStudent(userData);
            return cb(null, user);
          });
        }
      )
    );

    passport.serializeUser(function (user: any, done) {
      done(null, user.studentId);
    });

    passport.deserializeUser(async (studentId: any, done) => {
      const user = await studentModel.retrieveStudentDetails({
        studentId: studentId,
      });
      done(null, user);
    });
  }
}
export default MicrosoftPassport;
