require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const config = require("./utils/config");
const connectDatabase = require("./db/connectDB");
const { job } = require("./cron");

const app = require("./app");
const {initializeRedisClient }= require("./middlewares/redis");
const PORT = config.PORT;

async function start() {
  try {
    await initializeRedisClient();
    await connectDatabase(config.MONGO_URI);
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
