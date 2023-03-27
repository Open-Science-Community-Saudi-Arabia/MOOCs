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
app.use(morgan("dev")); 
// app.use((req, res, next) => {
//     console.log('not cors')
//     const allowed_origins = ['http://localhost:5173', 'https://7491-102-89-40-201.eu.ngrok.io']
//     const origin = req.header.origin;
//     console.log(origin)
    
//     if (origin) {
//         res.setHeader('Access-Control-Allow-Origin', origin);
//     } else {
        
//         res.setHeader('Access-Control-Allow-Origin', "*");
//         // res.setHeader('Access-Control-Allow-Origin', "https://68a9-102-89-22-182.eu.ngrok.io");
//     }

//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST', 'PUT', 'DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Headers', 'Bearer, Authorization');
//     res.header('Access-Control-Allow-Credentials', true);
    
//     next()
// })
// app.use(cors())
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
