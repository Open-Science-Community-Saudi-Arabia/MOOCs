
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const errorHandler = require("./middlewares/error_handler");
const app = express();


// Middlewares
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// Route handler
require('./routes/routes_handler')(app)

// Error handler middleware
app.use(errorHandler)

module.exports = app;