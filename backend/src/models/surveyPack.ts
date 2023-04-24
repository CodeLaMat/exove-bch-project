import * as mongoose from "mongoose";
import { Model } from "mongoose";
import {
  ISurveypack,
  SurveyPackStatus,
  SurveyorsAcceptance,
  SurveyorsStatus,
} from "../types/dataTypes";

type SurveyPackType = ISurveypack & mongoose.Document;

// type Surveyors = IParticipant & mongoose.Document;

// const SurveyorsSchema = new mongoose.Schema({
//   staff: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   acceptanceStatus: {
//     type: String,
//     enum: Object.values(SurveyorsAcceptance),
//   },
//   status: {
//     type: String,
//     enum: Object.values(SurveyorsStatus),
//   },
// });

const SurveyPackSchema = new mongoose.Schema(
  {
    personBeingSurveyed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Please select the employee to survey"],
    },
    survey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "survey",
      required: [true, "Please select the survey"],
    },
    employeesTakingSurvey: [
      {
        employee: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        acceptanceStatus: {
          type: String,
          enum: Object.values(SurveyorsAcceptance),
          default: "Pending",
        },
        isSurveyComplete: {
          type: String,
          enum: Object.values(SurveyorsStatus),
          default: "Open",
        },
      },
    ],
    deadline: {
      type: Date,
      required: [true, "Please add deadline"],
      default: Date.now(),
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(SurveyPackStatus),
      default: "Open",
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Please add the manager"],
      default: "",
    },
    managerapproved: {
      type: Boolean,
      default: false,
    },
    hrapproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const SurveyPack: Model<SurveyPackType> = mongoose.model<SurveyPackType>(
  "SurveyPack",
  SurveyPackSchema
);

export default SurveyPack;
