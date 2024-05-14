require("dotenv").config({ path: `${__dirname}/../.env.dev` });

const mongoose = require("mongoose");
const { User, Status } = require("../models/user.models");
const Password = require("../models/password.models");
mongoose.set("strictQuery", false);


async function connectToDatabase() {
  try {
    const MONGO_URL = process.env.MONGO_URI_DEV;

    console.log("Connecting to local database...");

    await mongoose.connect(MONGO_URL);

    console.log("Connected to local database successfully");
  } catch (error) {
    console.log("'[Error] - Error connecting to local database");
    process.exit(1);
  }
}

async function createTestUser() {
  const random_email =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    "@gmail.com";

  const user_data = {
    email: random_email,
    password: "testpassword",
    firstname: "Test",
    lastname: "User",
    role: "EndUser",
  };

  const user = await User.create(user_data);
  await Password.create({ user: user._id, password: user_data.password });
  await Status.create({ user: user._id, isVerified: true, isActive: true });
  return user_data;
}

async function seedDatabase() {
  try {
    // Connect to the database
    await connectToDatabase();
    const new_user = await createTestUser();
    console.log("Database seeded successfully");
    console.log(
      `
            User created successfully
            Email: ${new_user.email}
            Password: ${new_user.password}
            Use the above credentials to log into the client app
            `
    );
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
    process.exit(0);
  }
}

// Handle any unhandled promise rejections by logging them
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
