import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { IResponsePack } from "../types/dataTypes";

type ResponseType = IResponsePack & mongoose.Document;

const QuestionResponseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  response: {
    type: String,
  },
});

// const SurveyResponsesSchema = new mongoose.Schema({
//   employeeTakingSurvey: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   allResponses: [QuestionResponseSchema],
// });

const ResponsePackSchema = new mongoose.Schema(
  {
    surveyPack: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SurveyPack",
      required: true,
    },
    personBeingSurveyed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SurveyPack",
      required: true,
    },
    employeeTakingSurvey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    survey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "survey",
      required: true,
    },
    allResponses: [QuestionResponseSchema],
  },
  { timestamps: true }
);

const ResponsePack: Model<ResponseType> = mongoose.model<ResponseType>(
  "ResponsePack",
  ResponsePackSchema
);

export default ResponsePack;
