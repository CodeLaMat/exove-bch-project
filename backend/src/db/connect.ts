import mongoose from "mongoose";

let url = process.env.MONGO_URI;

const connectDB = (url: string) => {
  return mongoose.connect(url);
};

export default connectDB;
