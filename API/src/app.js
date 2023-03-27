const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
require('express-async-errors')
const cookieParser = require('cookie-parser')

const errorHandler = require("./middlewares/error_handler");
const app = express();
const session = require("express-session");
const UUID = require("uuid").v4;

// Middlewares
if (process.env.NODE_ENV == "dev") app.use(morgan("dev"));

// manually allow all origins
function allowAllOrigins(req) {
    if (req.headers.origin) {
        return req.headers.origin;
    }
}
app.use(cors({
    origins: ['https://7491-102-89-40-201.eu.ngrok.io'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(cookieParser());
app.use(express.json());

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
