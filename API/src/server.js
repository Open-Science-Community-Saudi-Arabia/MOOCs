const environments = ["dev", "test", "prod"];
const NODE_ENV = process.env.NODE_ENV;
if (environments.includes(NODE_ENV)) {
  require("dotenv").config({ path: `.env.${NODE_ENV}` });
} else {
  require("dotenv").config({ path: `.env` });
}

const config = require("./utils/config");
const connectDatabase = require("./db/connectDB");
const { job } = require("./cron");
const app = require("./app");

const PORT = config.PORT;
async function start() {
  try {
    await connectDatabase(process.env.MONGO_URI_DEV);
    app.listen(PORT, function () {
      console.log(`Server is running on port ${PORT}....`);
    });
  } catch (error) {
    console.log(error);
  }
}

job.start();
start();
