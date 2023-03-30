import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { QuestionModel } from "../types/dataTypes";

type QuestionType = QuestionModel & mongoose.Document;

const QuestionSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: {
      values: [
        "Quality Focus",
        "People Skills",
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
    required: [true, "Question must be provided"],
  },
  description: {
    type: String,
  },
  isFreeForm: {
    type: Boolean,
    default: false,
  },
});

const Question: Model<QuestionType> = mongoose.model<QuestionType>(
  "Question",
  QuestionSchema
);

export default Question;
