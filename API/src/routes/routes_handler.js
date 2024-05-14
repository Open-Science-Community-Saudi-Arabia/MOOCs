const authRoute = require("./auth.routes");
const courseRoute = require("./course");
const userRoute = require("./user");
// const certificateRoute = require("./certificate.routes")


module.exports = function (app) {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/course", courseRoute);
  app.use("/api/v1/user", userRoute);
  // app.use('/api/v1/certificate', certificateRoute)
};
