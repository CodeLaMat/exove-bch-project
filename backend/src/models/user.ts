import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { UserModel } from "../types/dataTypes";

type UserType = UserModel & mongoose.Document;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name must be provided"],
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: [true, "last name must be provided"],
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "email must be provided"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password must be provided"],
  },
  jobProfile: {
    type: String,
  },
  department: {
    type: String,
  },
  image: {
    type: Buffer,
  },
});

const User: Model<UserType> = mongoose.model<UserType>("User", UserSchema);

export default User;
