const environments = ["dev", "test", "prod"];
const NODE_ENV = process.env.NODE_ENV;
if (environments.includes(NODE_ENV)) {
  require("dotenv").config({ path: `${__dirname}/.env.${NODE_ENV}` });
} else {
  require("dotenv").config({ path: `${__dirname}/.env` });
}

// Project config variables
const config = require("./utils/config");
const connectDatabase = require("./db/connectDB");
const { createSuperAdmin } = require("./seeders");
function getMongoURI() {
  return config[
    "MONGO_URI" +
      (environments.includes(NODE_ENV) ? `_${NODE_ENV.toUpperCase()}` : "")
  ];
}

const app = require("./app");
const { default: axios } = require("axios");
const PORT = config.PORT;
async function start() {
  try {
    await connectDatabase(getMongoURI());
    app.listen(PORT, function () {
      console.log(`Server is running on port ${PORT}....`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
