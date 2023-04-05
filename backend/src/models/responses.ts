import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { ResponseModel } from "../types/dataTypes";

type ResponseType = ResponseModel & mongoose.Document;

const ResponseSchema = new mongoose.Schema(
  {
    questionID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    evaluatedID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedEvaluations: {
      type: Array,
      required: true,
    },
    response: {
      type: mongoose.Schema.Types.Mixed,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Responses: Model<ResponseType> = mongoose.model<ResponseType>(
  "Responses",
  ResponseSchema
);

export default Responses;
