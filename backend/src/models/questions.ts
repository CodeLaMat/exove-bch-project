import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { QuestionModel } from "../types/dataTypes";

type QuestionType = QuestionModel & mongoose.Document;

const QuestionSchema = new mongoose.Schema({
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
    required: [true, "Question must be provided"],
  },
  description: {
    type: String,
  },
  questionType: {
    type: String,
    enum: {
      values: [
        "Multiple choice",
        "Free form",
      ],
      message: `{VALUE} is not supported`,
    },
  },
});

const Question: Model<QuestionType> = mongoose.model<QuestionType>(
  "Question",
  QuestionSchema
);

export default Question;
