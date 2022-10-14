
const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const app = express();


// Middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

// Route handler
require('./routes/routes_handler')(app)

module.exports = app;