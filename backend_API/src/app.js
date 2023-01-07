const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error_handler");
const app = express();
const session = require("express-session");
const UUID = require("uuid").v4;
require('express-async-errors')
// Middlewares
if (process.env.NODE_ENV == "dev") app.use(morgan("dev"));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret: UUID(),
    resave: false,
    saveUninitialized: true,
}))



// Route handler
require("./routes/routes_handler")(app);

// Error handler middleware
app.use(errorHandler);
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
