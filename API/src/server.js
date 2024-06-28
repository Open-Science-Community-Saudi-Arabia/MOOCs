const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV) {
  require("dotenv").config({ path: `.env.${NODE_ENV}` });
} else {
  require("dotenv").config({ path: `.env` });
}

const config = require("./utils/config");
const connectDatabase = require("./db/connectDB");
const { job } = require("./cron");

function getMongoURI() {
  return NODE_ENV
    ? config[`MONGO_URI_${NODE_ENV.toUpperCase()}`]
    : config.MONGO_URI;
}

const app = require("./app");
const PORT = config.PORT;

async function start() {
  try {
    await connectDatabase(getMongoURI());
    job.start();
    app.listen(PORT, function () {
      console.log(`Server is running on port ${PORT}....`);
    });
  } catch (error) {
    console.log(error);
  }
}

job.start();
start();
