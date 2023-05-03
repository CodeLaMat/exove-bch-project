import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { QuestionModel } from "../types/dataTypes";

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: {
      values: [
        "Quality focus",
        "People skills",
        "Self guidance",
        "Leadership",
        "Readiness for change",
        "Creativity",
        "General Evaluation",
      ],
      message: `{VALUE} is not supported`,
    },
  },
  question: {
    type: String,
    required: [true, "Survey must be provided"],
  },
  description: {
    type: String,
  },
  questionType: {
    type: String,
    enum: {
      values: ["Multiple choice", "Free form"],
      message: `{VALUE} is not supported`,
    },
  },
});

const surveySchema = new mongoose.Schema(
  {
    surveyName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const survey = mongoose.model("survey", surveySchema);

export default survey