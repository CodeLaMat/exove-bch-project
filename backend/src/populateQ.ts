import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect";
import Question from "./models/questions";

import jsonQuestion from "./storage/questionsV2.json";

const start = async () => {
  try {
    await connectDB(`${process.env.MONGO_URL}`);
    await Question.deleteMany();
    await Question.create(jsonQuestion);
    console.log("success!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
