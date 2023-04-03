import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect";
import User from "./models/user";

import jsonUser from "./storage/Users.json";

const start = async () => {
  try {
    await connectDB(`${process.env.MONGO_URL}`);
    await User.deleteMany();
    await User.create(jsonUser);
    console.log("success!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
